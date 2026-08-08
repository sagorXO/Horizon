import * as THREE from 'three';

export interface AssemblyNode {
  mesh: THREE.Object3D;
  initialPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  initialScale: THREE.Vector3;
  targetScale: THREE.Vector3;
  initialRot: THREE.Euler;
  targetRot: THREE.Euler;
  progressStart: number;
  progressEnd: number;
  isLight?: boolean;
  initialIntensity?: number;
  targetIntensity?: number;
}

export class BuildingAssembly {
  public group: THREE.Group;
  private nodes: AssemblyNode[] = [];
  private beaconLight: THREE.PointLight | null = null;
  private beaconMesh: THREE.Mesh | null = null;
  private beaconMaterial: THREE.MeshBasicMaterial | null = null;
  private interiorLights: { light: THREE.PointLight; baseIntensity: number }[] = [];

  // Specified Primary Materials
  private steelMaterial: THREE.MeshStandardMaterial;
  private slabMaterial: THREE.MeshStandardMaterial;
  private fasciaTrimMaterial: THREE.MeshStandardMaterial;
  private glassMaterial: THREE.MeshPhysicalMaterial;

  // Auxiliary Materials for Detail
  private coreMaterial: THREE.MeshStandardMaterial;
  private mullionMaterial: THREE.MeshStandardMaterial;
  private spandrelMaterial: THREE.MeshStandardMaterial;
  private ceilingLightMat: THREE.MeshStandardMaterial;
  private foliageMat: THREE.MeshStandardMaterial;

  private currentProgress: number = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'BuildingAssembly';

    // Structural Steel Skeleton Material (Dark Charcoal Gunmetal Steel)
    this.steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.25,
    });

    // Composite Floor Decking Base Slab
    this.slabMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6,
      metalness: 0.1,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.2,
    });

    // Champagne Silver Metallic Fascia Trim
    this.fasciaTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.8,
      roughness: 0.2,
    });

    // High-Clarity Glass Curtain Facade
    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6ba3be,
      transmission: 0.88,
      roughness: 0.05,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.9,
      reflectivity: 0.9,
    });

    // Elevator Core Shaft Concrete
    this.coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.2,
    });

    // Vertical Metallic Mullion Fins
    this.mullionMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.2,
    });

    // Horizontal Spandrel Glass/Metal Bands
    this.spandrelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
    });

    // Warm Interior Ceiling Light Fixture Arrays
    this.ceilingLightMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });

    // Rooftop Garden Terrace Evergreen Foliage
    this.foliageMat = new THREE.MeshStandardMaterial({
      color: 0x2d4a3e,
      roughness: 0.8,
      metalness: 0.1,
    });

    this.build45StorySkyscraperNodes();
    this.assembleBuilding(0);
  }

  /**
   * Helper method to construct wide-flange I-beam girders
   */
  private createIBeam(length: number, depth: number = 0.16, flangeWidth: number = 0.12, thickness: number = 0.02): THREE.Group {
    const group = new THREE.Group();
    // Top Flange Plate
    const topFlangeGeo = new THREE.BoxGeometry(length, thickness, flangeWidth);
    const topFlange = new THREE.Mesh(topFlangeGeo, this.steelMaterial);
    topFlange.position.y = depth / 2 - thickness / 2;
    topFlange.castShadow = true;
    group.add(topFlange);

    // Bottom Flange Plate
    const botFlangeGeo = new THREE.BoxGeometry(length, thickness, flangeWidth);
    const botFlange = new THREE.Mesh(botFlangeGeo, this.steelMaterial);
    botFlange.position.y = -depth / 2 + thickness / 2;
    botFlange.castShadow = true;
    group.add(botFlange);

    // Vertical Web Plate
    const webGeo = new THREE.BoxGeometry(length, depth - thickness * 2, thickness);
    const web = new THREE.Mesh(webGeo, this.steelMaterial);
    web.castShadow = true;
    group.add(web);

    return group;
  }

  /**
   * Constructs the 45-story commercial skyscraper with 3 setback tiers
   * mapped across 5 linear assembly stages.
   */
  private build45StorySkyscraperNodes(): void {
    const totalFloors = 45;
    const floorHeight = 1.0;
    const coreWidth = 2.4;

    // Helper to get floor width based on 3 setback tiers
    const getFloorWidth = (floorIndex: number): number => {
      if (floorIndex < 15) return 8.0;       // Tier 1 (Floors 0-14): Base Tier
      if (floorIndex < 30) return 6.4;       // Tier 2 (Floors 15-29): Mid Tier Setback
      return 4.8;                             // Tier 3 (Floors 30-44): High Tier Setback
    };

    // =========================================================================
    // STAGE 0 (0.00 - 0.20): Excavation & Foundation Grid
    // =========================================================================
    const pierGeo = new THREE.CylinderGeometry(0.4, 0.4, 6.0, 12);
    const pierGrid = [
      [-4.0, -4.0], [-1.5, -4.0], [1.5, -4.0], [4.0, -4.0],
      [-4.0, -1.5], [-1.5, -1.5], [1.5, -1.5], [4.0, -1.5],
      [-4.0,  1.5], [-1.5,  1.5], [1.5,  1.5], [4.0,  1.5],
      [-4.0,  4.0], [-1.5,  4.0], [1.5,  4.0], [4.0,  4.0],
    ];

    pierGrid.forEach(([px, pz], idx) => {
      const pierMesh = new THREE.Mesh(pierGeo, this.steelMaterial);
      pierMesh.castShadow = true;
      this.group.add(pierMesh);

      const startP = (idx / pierGrid.length) * 0.10;
      this.nodes.push({
        mesh: pierMesh,
        initialPos: new THREE.Vector3(px, -20, pz),
        targetPos: new THREE.Vector3(px, -3.0, pz),
        initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0, 0, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: startP,
        progressEnd: startP + 0.08,
      });
    });

    // Heavy Foundation Mat Slab
    const matSlabGeo = new THREE.BoxGeometry(11.0, 0.6, 11.0);
    const matSlabMesh = new THREE.Mesh(matSlabGeo, this.coreMaterial);
    matSlabMesh.castShadow = true;
    matSlabMesh.receiveShadow = true;
    this.group.add(matSlabMesh);

    this.nodes.push({
      mesh: matSlabMesh,
      initialPos: new THREE.Vector3(0, -15, 0),
      targetPos: new THREE.Vector3(0, -0.3, 0),
      initialScale: new THREE.Vector3(0.2, 0.2, 0.2),
      targetScale: new THREE.Vector3(1, 1, 1),
      initialRot: new THREE.Euler(0, 0, 0),
      targetRot: new THREE.Euler(0, 0, 0),
      progressStart: 0.08,
      progressEnd: 0.18,
    });

    // Ground Floor Excavation Base Retaining Wall
    const retainingGeo = new THREE.BoxGeometry(9.4, 0.4, 9.4);
    const retainingMesh = new THREE.Mesh(retainingGeo, this.steelMaterial);
    this.group.add(retainingMesh);

    this.nodes.push({
      mesh: retainingMesh,
      initialPos: new THREE.Vector3(0, -10, 0),
      targetPos: new THREE.Vector3(0, 0.0, 0),
      initialScale: new THREE.Vector3(0.5, 0.1, 0.5),
      targetScale: new THREE.Vector3(1, 1, 1),
      initialRot: new THREE.Euler(0, 0, 0),
      targetRot: new THREE.Euler(0, 0, 0),
      progressStart: 0.12,
      progressEnd: 0.20,
    });

    // =========================================================================
    // STAGE 1 (0.20 - 0.45): Steel Skeleton Matrix Rise (45 Stories)
    // =========================================================================
    const colGeo = new THREE.CylinderGeometry(0.12, 0.12, floorHeight, 8);
    const plateGeo = new THREE.BoxGeometry(0.24, 0.08, 0.24);

    for (let i = 0; i < totalFloors; i++) {
      const currentWidth = getFloorWidth(i);
      const floorCenterY = i * floorHeight + floorHeight / 2;
      const startP = 0.20 + (i / totalFloors) * 0.21;
      const endP = startP + 0.04;

      // 1. Central Core Elevator Shaft Block
      const coreSegmentGeo = new THREE.BoxGeometry(coreWidth, floorHeight, coreWidth);
      const coreSegmentMesh = new THREE.Mesh(coreSegmentGeo, this.coreMaterial);
      coreSegmentMesh.castShadow = true;
      this.group.add(coreSegmentMesh);

      this.nodes.push({
        mesh: coreSegmentMesh,
        initialPos: new THREE.Vector3(0, floorCenterY - 12, 0),
        targetPos: new THREE.Vector3(0, floorCenterY, 0),
        initialScale: new THREE.Vector3(0.8, 0.1, 0.8),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0, 0, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: startP,
        progressEnd: endP,
      });

      // 2. Corner Structural Steel Columns & Metallic Connection Plates (4 per floor)
      const halfW = currentWidth / 2 - 0.2;
      const corners = [
        [-halfW, -halfW],
        [ halfW, -halfW],
        [ halfW,  halfW],
        [-halfW,  halfW],
      ];

      corners.forEach(([cx, cz], cIdx) => {
        const colGroup = new THREE.Group();
        const colMesh = new THREE.Mesh(colGeo, this.steelMaterial);
        colMesh.castShadow = true;
        colGroup.add(colMesh);

        // Steel Connection Plates at Column Joints
        const topPlate = new THREE.Mesh(plateGeo, this.steelMaterial);
        topPlate.position.y = floorHeight / 2 - 0.04;
        topPlate.castShadow = true;
        colGroup.add(topPlate);

        const botPlate = new THREE.Mesh(plateGeo, this.steelMaterial);
        botPlate.position.y = -floorHeight / 2 + 0.04;
        botPlate.castShadow = true;
        colGroup.add(botPlate);

        this.group.add(colGroup);

        this.nodes.push({
          mesh: colGroup,
          initialPos: new THREE.Vector3(cx * 1.8, floorCenterY + 8 + cIdx, cz * 1.8),
          targetPos: new THREE.Vector3(cx, floorCenterY, cz),
          initialScale: new THREE.Vector3(0.2, 0.1, 0.2),
          targetScale: new THREE.Vector3(1, 1, 1),
          initialRot: new THREE.Euler(Math.PI / 4, 0, 0),
          targetRot: new THREE.Euler(0, 0, 0),
          progressStart: startP + 0.005,
          progressEnd: endP + 0.005,
        });
      });

      // 3. Wide-Flange I-Beam Girders Outer Rim & Diagonal X-Bracing Trusses
      const rimGroup = new THREE.Group();

      const beamN = this.createIBeam(currentWidth, 0.16, 0.12, 0.02);
      beamN.position.set(0, floorHeight / 2 - 0.08, halfW);

      const beamS = this.createIBeam(currentWidth, 0.16, 0.12, 0.02);
      beamS.position.set(0, floorHeight / 2 - 0.08, -halfW);

      const beamE = this.createIBeam(currentWidth, 0.16, 0.12, 0.02);
      beamE.rotation.y = Math.PI / 2;
      beamE.position.set(halfW, floorHeight / 2 - 0.08, 0);

      const beamW = this.createIBeam(currentWidth, 0.16, 0.12, 0.02);
      beamW.rotation.y = Math.PI / 2;
      beamW.position.set(-halfW, floorHeight / 2 - 0.08, 0);

      rimGroup.add(beamN, beamS, beamE, beamW);

      // Diagonal Load-Bearing X-Bracing Trusses (every 3 floors)
      if (i % 3 === 0) {
        const span = currentWidth - 0.4;
        const diagLen = Math.hypot(span, floorHeight);
        const diagAngle = Math.atan2(floorHeight, span);
        const trussGeo = new THREE.CylinderGeometry(0.04, 0.04, diagLen, 8);

        // North & South Facade X-Braces
        [halfW, -halfW].forEach((zPos) => {
          const x1 = new THREE.Mesh(trussGeo, this.steelMaterial);
          x1.rotation.z = diagAngle;
          x1.position.set(0, 0, zPos);

          const x2 = new THREE.Mesh(trussGeo, this.steelMaterial);
          x2.rotation.z = -diagAngle;
          x2.position.set(0, 0, zPos);

          rimGroup.add(x1, x2);
        });

        // East & West Facade X-Braces
        [halfW, -halfW].forEach((xPos) => {
          const z1 = new THREE.Mesh(trussGeo, this.steelMaterial);
          z1.rotation.x = diagAngle;
          z1.rotation.y = Math.PI / 2;
          z1.position.set(xPos, 0, 0);

          const z2 = new THREE.Mesh(trussGeo, this.steelMaterial);
          z2.rotation.x = -diagAngle;
          z2.rotation.y = Math.PI / 2;
          z2.position.set(xPos, 0, 0);

          rimGroup.add(z1, z2);
        });
      }

      this.group.add(rimGroup);

      this.nodes.push({
        mesh: rimGroup,
        initialPos: new THREE.Vector3(0, floorCenterY + 15, 0),
        targetPos: new THREE.Vector3(0, floorCenterY - floorHeight / 2, 0),
        initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0, Math.PI / 2, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: startP + 0.01,
        progressEnd: endP + 0.01,
      });
    }

    // =========================================================================
    // STAGE 2 (0.45 - 0.65): Concrete Floor Slabs, Metallic Trim & Ceiling Light Arrays
    // =========================================================================
    for (let i = 0; i < totalFloors; i++) {
      const currentWidth = getFloorWidth(i);
      const floorTargetY = (i + 1) * floorHeight;
      const startP = 0.45 + (i / totalFloors) * 0.16;
      const endP = startP + 0.04;

      const slabGroup = new THREE.Group();

      // Composite Floor Decking Base Slab
      const slabMesh = new THREE.Mesh(
        new THREE.BoxGeometry(currentWidth, 0.18, currentWidth),
        this.slabMaterial
      );
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      slabGroup.add(slabMesh);

      // Champagne Silver Metallic Fascia Trim Rim
      const trimThick = 0.04;
      const trimHeight = 0.20;
      const trimN = new THREE.Mesh(new THREE.BoxGeometry(currentWidth + 0.02, trimHeight, trimThick), this.fasciaTrimMaterial);
      trimN.position.set(0, 0, currentWidth / 2 + trimThick / 2);
      const trimS = new THREE.Mesh(new THREE.BoxGeometry(currentWidth + 0.02, trimHeight, trimThick), this.fasciaTrimMaterial);
      trimS.position.set(0, 0, -currentWidth / 2 - trimThick / 2);
      const trimE = new THREE.Mesh(new THREE.BoxGeometry(trimThick, trimHeight, currentWidth + 0.02), this.fasciaTrimMaterial);
      trimE.position.set(currentWidth / 2 + trimThick / 2, 0, 0);
      const trimW = new THREE.Mesh(new THREE.BoxGeometry(trimThick, trimHeight, currentWidth + 0.02), this.fasciaTrimMaterial);
      trimW.position.set(-currentWidth / 2 - trimThick / 2, 0, 0);
      slabGroup.add(trimN, trimS, trimE, trimW);

      // Warm Interior Ceiling Light Fixture Array
      const lightStripGeo = new THREE.BoxGeometry(currentWidth * 0.5, 0.03, 0.12);
      const lightOffset = currentWidth * 0.22;
      const ceilingY = -0.10;

      const light1 = new THREE.Mesh(lightStripGeo, this.ceilingLightMat);
      light1.position.set(0, ceilingY, lightOffset);
      const light2 = new THREE.Mesh(lightStripGeo, this.ceilingLightMat);
      light2.position.set(0, ceilingY, -lightOffset);

      const light3 = new THREE.Mesh(lightStripGeo, this.ceilingLightMat);
      light3.rotation.y = Math.PI / 2;
      light3.position.set(lightOffset, ceilingY, 0);
      const light4 = new THREE.Mesh(lightStripGeo, this.ceilingLightMat);
      light4.rotation.y = Math.PI / 2;
      light4.position.set(-lightOffset, ceilingY, 0);

      slabGroup.add(light1, light2, light3, light4);

      this.group.add(slabGroup);

      const orbitAngle = (i / totalFloors) * Math.PI * 4;
      this.nodes.push({
        mesh: slabGroup,
        initialPos: new THREE.Vector3(
          Math.cos(orbitAngle) * 16,
          floorTargetY + 8,
          Math.sin(orbitAngle) * 16
        ),
        targetPos: new THREE.Vector3(0, floorTargetY, 0),
        initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0.3, orbitAngle, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: startP,
        progressEnd: endP,
      });
    }

    // =========================================================================
    // STAGE 3 (0.65 - 0.85): Outer Glass Curtain Facade, Spandrel Bands & Mullions
    // =========================================================================
    for (let i = 0; i < totalFloors; i++) {
      const currentWidth = getFloorWidth(i);
      const floorCenterY = i * floorHeight + floorHeight / 2;
      const startP = 0.65 + (i / totalFloors) * 0.16;
      const endP = startP + 0.04;

      const glassW = currentWidth - 0.08;
      const glassH = floorHeight - 0.14;
      const glassGeo = new THREE.BoxGeometry(glassW, glassH, 0.04);
      const spandrelGeo = new THREE.BoxGeometry(currentWidth, 0.14, 0.06);

      const facades = [
        { rotY: 0,             pos: [0, currentWidth / 2] },
        { rotY: Math.PI / 2,   pos: [currentWidth / 2, 0] },
        { rotY: Math.PI,       pos: [0, -currentWidth / 2] },
        { rotY: -Math.PI / 2,  pos: [-currentWidth / 2, 0] },
      ];

      facades.forEach((facade, fIdx) => {
        const panelGroup = new THREE.Group();

        // 1. Exterior High-Clarity Glass Panel
        const glassMesh = new THREE.Mesh(glassGeo, this.glassMaterial);
        glassMesh.position.y = 0.04;
        panelGroup.add(glassMesh);

        // 2. Horizontal Spandrel Band
        const spandrelMesh = new THREE.Mesh(spandrelGeo, this.spandrelMaterial);
        spandrelMesh.position.y = -floorHeight / 2 + 0.07;
        panelGroup.add(spandrelMesh);

        // 3. Vertical Metallic Mullion Fins
        const mullionGeo = new THREE.BoxGeometry(0.06, floorHeight, 0.12);
        const finCount = 4;
        const spacing = (currentWidth - 0.6) / finCount;
        for (let fn = 0; fn <= finCount; fn++) {
          const finX = (fn - finCount / 2) * spacing;
          const finMesh = new THREE.Mesh(mullionGeo, this.mullionMaterial);
          finMesh.position.set(finX, 0, 0.05);
          panelGroup.add(finMesh);
        }

        this.group.add(panelGroup);

        const angle = facade.rotY;
        const orbitDist = 20;
        this.nodes.push({
          mesh: panelGroup,
          initialPos: new THREE.Vector3(
            facade.pos[0] + Math.sin(angle) * orbitDist,
            floorCenterY + 4,
            facade.pos[1] + Math.cos(angle) * orbitDist
          ),
          targetPos: new THREE.Vector3(facade.pos[0], floorCenterY, facade.pos[1]),
          initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
          targetScale: new THREE.Vector3(1, 1, 1),
          initialRot: new THREE.Euler(0, facade.rotY + Math.PI / 2, 0),
          targetRot: new THREE.Euler(0, facade.rotY, 0),
          progressStart: startP + fIdx * 0.002,
          progressEnd: endP + fIdx * 0.002,
        });
      });
    }

    // =========================================================================
    // STAGE 4 (0.85 - 1.00): Interior Glow, Faceted Crown, Garden Terrace & Helipad
    // =========================================================================
    // Interior Point Lights per 3 floors
    for (let i = 1; i < totalFloors; i += 3) {
      const floorY = i * floorHeight + floorHeight / 2;
      const floorLight = new THREE.PointLight(0xf59e0b, 0, 8);
      floorLight.position.set(0, floorY, 0);
      this.group.add(floorLight);
      this.interiorLights.push({ light: floorLight, baseIntensity: 3.5 });

      this.nodes.push({
        mesh: floorLight,
        initialPos: new THREE.Vector3(0, floorY, 0),
        targetPos: new THREE.Vector3(0, floorY, 0),
        initialScale: new THREE.Vector3(1, 1, 1),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0, 0, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: 0.85 + (i / totalFloors) * 0.10,
        progressEnd: 0.95,
        isLight: true,
        initialIntensity: 0,
        targetIntensity: 3.5,
      });
    }

    // Crown Structure (Roof Tier Above Floor 45)
    const roofY = totalFloors * floorHeight;
    const crownGroup = new THREE.Group();

    // 1. Faceted Crown Glass Penthouse Prism
    const crownGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.9,
      roughness: 0.04,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transparent: true,
      opacity: 0.9,
    });
    const crownGeo = new THREE.ConeGeometry(3.2, 3.8, 4);
    const crownMesh = new THREE.Mesh(crownGeo, crownGlassMat);
    crownMesh.rotation.y = Math.PI / 4;
    crownMesh.position.y = 1.9;
    crownGroup.add(crownMesh);

    // 2. Rooftop Garden Terrace & Planter Beds
    const terraceBase = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 0.2, 4.6),
      this.slabMaterial
    );
    terraceBase.position.y = 0.1;
    crownGroup.add(terraceBase);

    const planterGeo = new THREE.BoxGeometry(1.2, 0.3, 0.6);
    const planterMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
    const bushGeo = new THREE.SphereGeometry(0.35, 8, 8);
    bushGeo.scale(1.2, 0.6, 1.2);

    [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]].forEach(([px, pz]) => {
      const planter = new THREE.Mesh(planterGeo, planterMat);
      planter.position.set(px, 0.35, pz);
      crownGroup.add(planter);

      const bush = new THREE.Mesh(bushGeo, this.foliageMat);
      bush.position.set(px, 0.6, pz);
      crownGroup.add(bush);
    });

    // 3. Helipad Platform & Markings
    const helipadPadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const helipadPad = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.1, 32), helipadPadMat);
    helipadPad.position.set(0, 0.25, 0);
    crownGroup.add(helipadPad);

    // Helipad Yellow "H" Marking
    const hMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const hBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.8), hMat);
    hBar1.position.set(-0.22, 0.31, 0);
    const hBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.8), hMat);
    hBar2.position.set(0.22, 0.31, 0);
    const hCross = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.02, 0.12), hMat);
    hCross.position.set(0, 0.31, 0);
    crownGroup.add(hBar1, hBar2, hCross);

    // 4. Telecommunication Antenna Spire & Aviation Beacon
    const spireH = 8.0;
    const spireGeo = new THREE.CylinderGeometry(0.04, 0.12, spireH, 8);
    const spireMesh = new THREE.Mesh(spireGeo, this.steelMaterial);
    spireMesh.position.y = 3.8 + spireH / 2;
    crownGroup.add(spireMesh);

    // Glowing Red Aviation Beacon Light Spire Tip
    this.beaconLight = new THREE.PointLight(0xef4444, 0, 20);
    this.beaconLight.position.set(0, 3.8 + spireH + 0.1, 0);
    crownGroup.add(this.beaconLight);

    this.beaconMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    this.beaconMesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), this.beaconMaterial);
    this.beaconMesh.position.set(0, 3.8 + spireH + 0.1, 0);
    crownGroup.add(this.beaconMesh);

    this.group.add(crownGroup);

    this.nodes.push({
      mesh: crownGroup,
      initialPos: new THREE.Vector3(0, roofY + 25, 0),
      targetPos: new THREE.Vector3(0, roofY, 0),
      initialScale: new THREE.Vector3(0.2, 0.2, 0.2),
      targetScale: new THREE.Vector3(1, 1, 1),
      initialRot: new THREE.Euler(Math.PI / 4, 0, 0),
      targetRot: new THREE.Euler(0, 0, 0),
      progressStart: 0.88,
      progressEnd: 1.0,
    });
  }

  /**
   * Linear stage evaluation math in assembleBuilding(progress) across 5 distinct assembly phases (0.0 to 1.0)
   */
  public assembleBuilding(progress: number): void {
    this.currentProgress = THREE.MathUtils.clamp(progress, 0, 1);

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const range = node.progressEnd - node.progressStart;
      let t = range > 0 ? (this.currentProgress - node.progressStart) / range : 0;
      t = THREE.MathUtils.clamp(t, 0, 1);

      const easeT = THREE.MathUtils.smoothstep(t, 0, 1);

      node.mesh.position.lerpVectors(node.initialPos, node.targetPos, easeT);
      node.mesh.scale.lerpVectors(node.initialScale, node.targetScale, easeT);

      node.mesh.rotation.x = THREE.MathUtils.lerp(node.initialRot.x, node.targetRot.x, easeT);
      node.mesh.rotation.y = THREE.MathUtils.lerp(node.initialRot.y, node.targetRot.y, easeT);
      node.mesh.rotation.z = THREE.MathUtils.lerp(node.initialRot.z, node.targetRot.z, easeT);

      if (node.isLight && node.mesh instanceof THREE.Light) {
        node.mesh.intensity = THREE.MathUtils.lerp(
          node.initialIntensity ?? 0,
          node.targetIntensity ?? 1,
          easeT
        );
      }
    }

    // Dynamic interior slab emissive intensity during Stage 4
    if (this.slabMaterial) {
      if (this.currentProgress >= 0.85) {
        const glowT = (this.currentProgress - 0.85) / 0.15;
        this.slabMaterial.emissiveIntensity = THREE.MathUtils.lerp(0.2, 0.8, glowT);
      } else {
        this.slabMaterial.emissiveIntensity = 0.2;
      }
    }
  }

  public update(elapsedTime: number): void {
    if (this.beaconLight && this.beaconMaterial && this.currentProgress > 0.85) {
      const flash = Math.sin(elapsedTime * 9) > 0.3;
      this.beaconLight.intensity = flash ? 5.0 : 0.2;
      this.beaconMaterial.color.setHex(flash ? 0xef4444 : 0x450a0a);
    }

    if (this.currentProgress > 0.85) {
      this.interiorLights.forEach(({ light, baseIntensity }, idx) => {
        const pulse = Math.sin(elapsedTime * 1.5 + idx) * 0.2 + 1.0;
        light.intensity = baseIntensity * pulse;
      });
    }
  }

  public dispose(): void {
    this.nodes.forEach((node) => {
      this.group.remove(node.mesh);
      if ((node.mesh as THREE.Mesh).isMesh) {
        (node.mesh as THREE.Mesh).geometry?.dispose();
      }
    });

    this.steelMaterial.dispose();
    this.slabMaterial.dispose();
    this.fasciaTrimMaterial.dispose();
    this.glassMaterial.dispose();
    this.coreMaterial.dispose();
    this.mullionMaterial.dispose();
    this.spandrelMaterial.dispose();
    this.ceilingLightMat.dispose();
    this.foliageMat.dispose();

    this.nodes = [];
    this.interiorLights = [];
  }
}
