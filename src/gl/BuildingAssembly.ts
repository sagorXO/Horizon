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

  // PBR Materials tuned to match Video.mp4 photorealism
  private glassMaterial: THREE.MeshPhysicalMaterial;
  private coreMaterial: THREE.MeshStandardMaterial;
  private steelMaterial: THREE.MeshStandardMaterial;
  private mullionMaterial: THREE.MeshStandardMaterial;
  private slabEdgeMaterial: THREE.MeshStandardMaterial;
  private crownGlassMaterial: THREE.MeshPhysicalMaterial;
  private poolMaterial: THREE.MeshStandardMaterial;
  private helipadMaterial: THREE.MeshStandardMaterial;

  private currentProgress: number = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'BuildingAssembly';

    // 1. High-Performance Reflective Curtain Wall Glass (Exact match to Video.mp4)
    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      transmission: 0.90,
      roughness: 0.05,
      metalness: 0.2,
      ior: 1.52,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.98,
    });

    // 2. Crown Faceted Glass
    this.crownGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.85,
      roughness: 0.03,
      metalness: 0.3,
      ior: 1.55,
      thickness: 1.0,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.9,
    });

    // 3. Concrete Core Material
    this.coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7,
      metalness: 0.1,
    });

    // 4. Structural Steel Framework
    this.steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.95,
    });

    // 5. Silver / Champagne Metallic Corner Mullions
    this.mullionMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.9,
    });

    // 6. Floor Slab Edge Metallic Trim
    this.slabEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.3,
      metalness: 0.7,
    });

    // 7. Pool & Helipad
    this.poolMaterial = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1 });
    this.helipadMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });

    this.buildExactSkyscraperNodes();
    this.assembleBuilding(0);
  }

  /**
   * Constructs the 16-story luxury skyscraper with 3 tapering setbacks,
   * vertical metallic mullions, faceted crown, and spire matching Video.mp4.
   */
  private buildExactSkyscraperNodes(): void {
    const totalFloors = 16;
    const floorHeight = 1.5;
    const coreSize = 2.0;

    // ----------------------------------------------------
    // STAGE 1: (0.00 - 0.25) Foundation Pilings & Concrete Core
    // ----------------------------------------------------

    // 1. Subterranean Concrete Grid Pilings (12 Columns matching Video frame 1)
    const pierGeo = new THREE.CylinderGeometry(0.35, 0.35, 4.0, 12);
    const pierPositions = [
      [-3.0, -3.0], [0, -3.0], [3.0, -3.0],
      [-3.0, 0],    [0, 0],    [3.0, 0],
      [-3.0, 3.0],  [0, 3.0],  [3.0, 3.0],
    ];

    pierPositions.forEach(([px, pz]) => {
      const pierMesh = new THREE.Mesh(pierGeo, this.coreMaterial);
      pierMesh.castShadow = true;
      this.group.add(pierMesh);

      this.nodes.push({
        mesh: pierMesh,
        initialPos: new THREE.Vector3(px, -20, pz),
        targetPos: new THREE.Vector3(px, -2.0, pz),
        initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0, 0, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: 0.0,
        progressEnd: 0.08,
      });
    });

    // 2. Foundation Ground Slab
    const baseSlabGeo = new THREE.BoxGeometry(9.0, 0.4, 9.0);
    const baseSlabMesh = new THREE.Mesh(baseSlabGeo, this.coreMaterial);
    baseSlabMesh.castShadow = true;
    baseSlabMesh.receiveShadow = true;
    this.group.add(baseSlabMesh);

    this.nodes.push({
      mesh: baseSlabMesh,
      initialPos: new THREE.Vector3(0, -15, 0),
      targetPos: new THREE.Vector3(0, -0.2, 0),
      initialScale: new THREE.Vector3(0.2, 0.2, 0.2),
      targetScale: new THREE.Vector3(1, 1, 1),
      initialRot: new THREE.Euler(0, 0, 0),
      targetRot: new THREE.Euler(0, 0, 0),
      progressStart: 0.02,
      progressEnd: 0.1,
    });

    // 3. Central Concrete Shaft
    const coreGeo = new THREE.BoxGeometry(coreSize, floorHeight, coreSize);
    for (let i = 0; i < totalFloors; i++) {
      const coreMesh = new THREE.Mesh(coreGeo, this.coreMaterial);
      coreMesh.castShadow = true;
      this.group.add(coreMesh);

      const targetY = i * floorHeight + floorHeight / 2;
      const startP = 0.06 + (i / totalFloors) * 0.16;

      this.nodes.push({
        mesh: coreMesh,
        initialPos: new THREE.Vector3(0, targetY - 18, 0),
        targetPos: new THREE.Vector3(0, targetY, 0),
        initialScale: new THREE.Vector3(0.8, 0.1, 0.8),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0, 0, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: startP,
        progressEnd: startP + 0.05,
      });
    }

    // ----------------------------------------------------
    // STAGE 2: (0.25 - 0.50) Steel Exoskeleton & Floor Slabs (Tapering Setbacks)
    // ----------------------------------------------------

    for (let i = 0; i < totalFloors; i++) {
      // Determine tapering width for 3 setback tiers
      let currentWidth = 6.0;
      if (i >= 5 && i < 11) currentWidth = 5.0; // Tier 2 setback
      if (i >= 11) currentWidth = 4.0;          // Tier 3 penthouse setback

      const targetY = (i + 1) * floorHeight;
      const startP = 0.25 + (i / totalFloors) * 0.18;
      const endP = startP + 0.06;

      // Floor Slab Group
      const slabGroup = new THREE.Group();
      const slabMesh = new THREE.Mesh(new THREE.BoxGeometry(currentWidth, 0.15, currentWidth), this.coreMaterial);
      slabMesh.castShadow = true;
      slabGroup.add(slabMesh);

      const fasciaMesh = new THREE.Mesh(new THREE.BoxGeometry(currentWidth + 0.08, 0.08, currentWidth + 0.08), this.slabEdgeMaterial);
      slabGroup.add(fasciaMesh);
      this.group.add(slabGroup);

      const angle = (i / totalFloors) * Math.PI * 2;
      this.nodes.push({
        mesh: slabGroup,
        initialPos: new THREE.Vector3(Math.cos(angle) * 20, targetY + 10, Math.sin(angle) * 20),
        targetPos: new THREE.Vector3(0, targetY, 0),
        initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0.2, angle, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: startP,
        progressEnd: endP,
      });

      // Perimeter Corner Steel Columns (4 per floor)
      const colGeo = new THREE.CylinderGeometry(0.15, 0.15, floorHeight, 8);
      const halfW = currentWidth / 2 - 0.25;
      const corners = [[-halfW, -halfW], [halfW, -halfW], [halfW, halfW], [-halfW, halfW]];

      const floorCenterY = i * floorHeight + floorHeight / 2;

      corners.forEach(([cx, cz], cIdx) => {
        const colMesh = new THREE.Mesh(colGeo, this.steelMaterial);
        colMesh.castShadow = true;
        this.group.add(colMesh);

        this.nodes.push({
          mesh: colMesh,
          initialPos: new THREE.Vector3(cx * 2, floorCenterY + (cIdx + 1) * 4, cz * 2),
          targetPos: new THREE.Vector3(cx, floorCenterY, cz),
          initialScale: new THREE.Vector3(0.2, 0.1, 0.2),
          targetScale: new THREE.Vector3(1, 1, 1),
          initialRot: new THREE.Euler(Math.PI / 2, 0, 0),
          targetRot: new THREE.Euler(0, 0, 0),
          progressStart: startP + 0.01,
          progressEnd: endP + 0.01,
        });
      });
    }

    // ----------------------------------------------------
    // STAGE 3: (0.50 - 0.75) Glass Facade & Metallic Vertical Mullion Fins
    // ----------------------------------------------------

    for (let i = 0; i < totalFloors; i++) {
      let currentWidth = 6.0;
      if (i >= 5 && i < 11) currentWidth = 5.0;
      if (i >= 11) currentWidth = 4.0;

      const floorY = i * floorHeight + floorHeight / 2;
      const startP = 0.5 + (i / totalFloors) * 0.2;
      const endP = startP + 0.05;

      const glassW = currentWidth - 0.1;
      const glassH = floorHeight - 0.1;
      const glassGeo = new THREE.BoxGeometry(glassW, glassH, 0.08);
      const finGeo = new THREE.BoxGeometry(0.08, floorHeight, 0.25);

      const facades = [
        { rotY: 0, pos: [0, currentWidth / 2] },
        { rotY: Math.PI / 2, pos: [currentWidth / 2, 0] },
        { rotY: Math.PI, pos: [0, -currentWidth / 2] },
        { rotY: -Math.PI / 2, pos: [-currentWidth / 2, 0] },
      ];

      facades.forEach((facade, fIdx) => {
        const panelGroup = new THREE.Group();

        // Reflective Curtain Wall Glass
        const glassMesh = new THREE.Mesh(glassGeo, this.glassMaterial);
        panelGroup.add(glassMesh);

        // Silver Vertical Mullion Fins (4 per facade panel matching Video.mp4)
        const finCount = 4;
        const finSpacing = (currentWidth - 0.8) / finCount;
        for (let fn = 0; fn < finCount; fn++) {
          const finX = (fn - (finCount - 1) / 2) * finSpacing;
          const finMesh = new THREE.Mesh(finGeo, this.mullionMaterial);
          finMesh.position.set(finX, 0, 0.1);
          panelGroup.add(finMesh);
        }

        this.group.add(panelGroup);

        const angle = facade.rotY;
        const orbitDist = 25;
        this.nodes.push({
          mesh: panelGroup,
          initialPos: new THREE.Vector3(facade.pos[0] + Math.sin(angle) * orbitDist, floorY + 6, facade.pos[1] + Math.cos(angle) * orbitDist),
          targetPos: new THREE.Vector3(facade.pos[0], floorY, facade.pos[1]),
          initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
          targetScale: new THREE.Vector3(1, 1, 1),
          initialRot: new THREE.Euler(0, facade.rotY + Math.PI / 2, 0),
          targetRot: new THREE.Euler(0, facade.rotY, 0),
          progressStart: startP,
          progressEnd: endP,
        });
      });

      // Warm Floor Interior Light
      const floorLight = new THREE.PointLight(0xf59e0b, 0, 10);
      floorLight.position.set(0, floorY, 0);
      this.group.add(floorLight);
      this.interiorLights.push({ light: floorLight, baseIntensity: 4.5 });

      this.nodes.push({
        mesh: floorLight,
        initialPos: new THREE.Vector3(0, floorY, 0),
        targetPos: new THREE.Vector3(0, floorY, 0),
        initialScale: new THREE.Vector3(1, 1, 1),
        targetScale: new THREE.Vector3(1, 1, 1),
        initialRot: new THREE.Euler(0, 0, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        progressStart: startP + 0.02,
        progressEnd: endP + 0.02,
        isLight: true,
        initialIntensity: 0,
        targetIntensity: 4.5,
      });
    }

    // ----------------------------------------------------
    // STAGE 4: (0.75 - 1.00) Faceted Setback Crown & Top Communications Spire
    // ----------------------------------------------------

    const roofY = totalFloors * floorHeight;

    // 1. Faceted Glass Setback Crown (Matching Video frame 7 & 8)
    const crownGroup = new THREE.Group();
    const crownGeo = new THREE.ConeGeometry(3.2, 4.5, 4);
    const crownMesh = new THREE.Mesh(crownGeo, this.crownGlassMaterial);
    crownMesh.rotation.y = Math.PI / 4;
    crownMesh.position.y = 2.25;
    crownGroup.add(crownMesh);

    // Crown Frame Trim
    const crownFrameGeo = new THREE.BoxGeometry(3.6, 0.2, 3.6);
    const crownFrameMesh = new THREE.Mesh(crownFrameGeo, this.mullionMaterial);
    crownGroup.add(crownFrameMesh);

    this.group.add(crownGroup);

    this.nodes.push({
      mesh: crownGroup,
      initialPos: new THREE.Vector3(0, roofY + 30, 0),
      targetPos: new THREE.Vector3(0, roofY, 0),
      initialScale: new THREE.Vector3(0.2, 0.2, 0.2),
      targetScale: new THREE.Vector3(1, 1, 1),
      initialRot: new THREE.Euler(Math.PI / 4, 0, 0),
      targetRot: new THREE.Euler(0, 0, 0),
      progressStart: 0.75,
      progressEnd: 0.88,
    });

    // 2. Central Communications Spire & Aviation Beacon Light
    const spireGroup = new THREE.Group();
    const spireH = 10.0;
    const spireGeo = new THREE.CylinderGeometry(0.05, 0.15, spireH, 8);
    const spireMesh = new THREE.Mesh(spireGeo, this.steelMaterial);
    spireGroup.add(spireMesh);

    this.beaconLight = new THREE.PointLight(0xef4444, 4.0, 25);
    this.beaconLight.position.set(0, spireH / 2 + 0.1, 0);
    spireGroup.add(this.beaconLight);

    this.beaconMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    this.beaconMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), this.beaconMaterial);
    this.beaconMesh.position.set(0, spireH / 2 + 0.1, 0);
    spireGroup.add(this.beaconMesh);

    this.group.add(spireGroup);

    const spireTargetY = roofY + 4.5 + spireH / 2;
    this.nodes.push({
      mesh: spireGroup,
      initialPos: new THREE.Vector3(0, spireTargetY + 40, 0),
      targetPos: new THREE.Vector3(0, spireTargetY, 0),
      initialScale: new THREE.Vector3(0.1, 0.1, 0.1),
      targetScale: new THREE.Vector3(1, 1, 1),
      initialRot: new THREE.Euler(0, 0, 0),
      targetRot: new THREE.Euler(0, 0, 0),
      progressStart: 0.88,
      progressEnd: 1.0,
    });
  }

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
  }

  public update(elapsedTime: number): void {
    if (this.beaconLight && this.beaconMaterial && this.currentProgress > 0.85) {
      const flash = Math.sin(elapsedTime * 9) > 0.3;
      this.beaconLight.intensity = flash ? 5.0 : 0.2;
      this.beaconMaterial.color.setHex(flash ? 0xef4444 : 0x450a0a);
    }

    if (this.currentProgress > 0.4) {
      this.interiorLights.forEach(({ light, baseIntensity }, idx) => {
        const pulse = Math.sin(elapsedTime * 1.5 + idx) * 0.25 + 1.0;
        light.intensity = baseIntensity * pulse * Math.min(1, (this.currentProgress - 0.4) * 2);
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

    this.glassMaterial.dispose();
    this.crownGlassMaterial.dispose();
    this.coreMaterial.dispose();
    this.steelMaterial.dispose();
    this.mullionMaterial.dispose();
    this.slabEdgeMaterial.dispose();
    this.poolMaterial.dispose();
    this.helipadMaterial.dispose();

    this.nodes = [];
    this.interiorLights = [];
  }
}
