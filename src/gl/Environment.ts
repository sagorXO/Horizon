import * as THREE from 'three';

export class Environment {
  public group: THREE.Group;
  private scene: THREE.Scene;

  // Sky & Lighting Components
  private skyDomeMesh: THREE.Mesh | null = null;
  private skyDomeMaterial: THREE.ShaderMaterial | null = null;
  private sunLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private hemisphereLight: THREE.HemisphereLight;

  // 3D Sun Disk & Clouds
  private sunMesh: THREE.Mesh | null = null;
  private cloudGroup: THREE.Group;

  // Ground, Roads & Plants
  private groundGroup: THREE.Group;
  private plantGroup: THREE.Group;
  private citySkylineGroup: THREE.Group;
  private starField: THREE.Points | null = null;
  private starGeometry: THREE.BufferGeometry | null = null;
  private starMaterial: THREE.ShaderMaterial | null = null;

  private cityWindowMaterials: THREE.MeshStandardMaterial[] = [];

  // Active theme state ('day' | 'night')
  public currentTheme: 'day' | 'night' = 'day';

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'EnvironmentGroup';

    this.cloudGroup = new THREE.Group();
    this.groundGroup = new THREE.Group();
    this.plantGroup = new THREE.Group();
    this.citySkylineGroup = new THREE.Group();

    // 1. Scene Fog - Subtle atmospheric perspective haze
    this.scene.fog = new THREE.FogExp2(0xbae6fd, 0.0012);

    // 2. High-Intensity Directional Sun Light (Warm Real-World Solar Lighting)
    this.sunLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
    this.sunLight.position.set(60, 90, 50);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 300;
    const shadowSize = 45;
    this.sunLight.shadow.camera.left = -shadowSize;
    this.sunLight.shadow.camera.right = shadowSize;
    this.sunLight.shadow.camera.top = shadowSize;
    this.sunLight.shadow.camera.bottom = -shadowSize;
    this.sunLight.shadow.bias = -0.00015;
    this.sunLight.shadow.radius = 3.5;
    this.group.add(this.sunLight);

    // 3. Fill Light for Soft Shadow Contrast
    this.fillLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    this.fillLight.position.set(-40, 50, -40);
    this.group.add(this.fillLight);

    // 4. Bright Ambient & Hemisphere Fill Lights
    this.ambientLight = new THREE.AmbientLight(0x93c5fd, 1.1);
    this.group.add(this.ambientLight);

    this.hemisphereLight = new THREE.HemisphereLight(0x38bdf8, 0x0284c7, 1.0);
    this.group.add(this.hemisphereLight);

    // 5. Procedural Sky Dome Shader
    this.createAtmosphericSkyDome();

    // 6. 3D Sun Mesh Disk
    this.createSunDisk();

    // 7. Volumetric 3D Cumulus Clouds
    this.createClouds();

    // 8. Ground Plane, Asphalt Roads & Sidewalk Infrastructure
    this.createGroundRoads();

    // 9. Urban Vegetation (Trees, Planter Boxes, Grass)
    this.createUrbanPlants();

    // 10. Scaled-Down Background City Skyline Ring
    this.createCitySkylineRing();

    // 11. Night Starfield Particles
    this.createStarfield(800);

    this.group.add(this.cloudGroup);
    this.group.add(this.groundGroup);
    this.group.add(this.plantGroup);
    this.group.add(this.citySkylineGroup);

    this.scene.add(this.group);

    // Default to Daylight Mode First
    this.setTheme('day');
  }

  /**
   * Procedural Sky Dome Shader.
   */
  private createAtmosphericSkyDome(): void {
    const skyGeo = new THREE.SphereGeometry(450, 64, 32);

    const vertexShader = `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 uTopColor;
      uniform vec3 uHorizonColor;
      uniform vec3 uBottomColor;
      uniform float uExponent;
      varying vec3 vWorldPosition;

      void main() {
        float h = normalize(vWorldPosition).y;
        float factor = max(0.0, h);
        vec3 skyColor = mix(uHorizonColor, uTopColor, pow(factor, uExponent));
        if (h < 0.0) {
          skyColor = mix(uHorizonColor, uBottomColor, min(1.0, -h * 4.0));
        }
        gl_FragColor = vec4(skyColor, 1.0);
      }
    `;

    this.skyDomeMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTopColor: { value: new THREE.Color(0x1d4ed8) },
        uHorizonColor: { value: new THREE.Color(0x38bdf8) },
        uBottomColor: { value: new THREE.Color(0xbae6fd) },
        uExponent: { value: 0.6 },
      },
      side: THREE.BackSide,
      depthWrite: false,
    });

    this.skyDomeMesh = new THREE.Mesh(skyGeo, this.skyDomeMaterial);
    this.group.add(this.skyDomeMesh);
  }

  /**
   * 3D Sun Disk placed at sun light direction.
   */
  private createSunDisk(): void {
    const sunGroup = new THREE.Group();

    // Bright Glowing Sun Core
    const sunGeo = new THREE.SphereGeometry(7, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(this.sunMesh);

    // Soft Solar Flare Halo
    const haloGeo = new THREE.PlaneGeometry(35, 35);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.lookAt(this.sunLight.position);
    sunGroup.add(haloMesh);

    sunGroup.position.copy(this.sunLight.position);
    this.group.add(sunGroup);
  }

  /**
   * Procedural Volumetric 3D Cloud Clusters drifting across sky.
   */
  private createClouds(): void {
    const cloudCount = 14;
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });

    for (let i = 0; i < cloudCount; i++) {
      const clusterGroup = new THREE.Group();
      const puffCount = 5 + Math.floor(Math.random() * 6);

      for (let p = 0; p < puffCount; p++) {
        const radius = 6 + Math.random() * 8;
        const puffGeo = new THREE.SphereGeometry(radius, 12, 12);
        const puffMesh = new THREE.Mesh(puffGeo, cloudMat);
        puffMesh.position.set(
          (p - puffCount / 2) * 6 + (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 4
        );
        clusterGroup.add(puffMesh);
      }

      const angle = (i / cloudCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = 120 + Math.random() * 80;
      const height = 65 + Math.random() * 30;

      clusterGroup.position.set(Math.sin(angle) * dist, height, Math.cos(angle) * dist);
      this.cloudGroup.add(clusterGroup);
    }
  }

  /**
   * Realistic Ground, Road Network & Sidewalk Curbs around Site.
   */
  private createGroundRoads(): void {
    // 1. Large Surrounding Urban Base Plane
    const groundGeo = new THREE.PlaneGeometry(450, 450);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Slate Urban Ground
      roughness: 0.85,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.5;
    groundMesh.receiveShadow = true;
    this.groundGroup.add(groundMesh);

    // 2. Asphalt Road Ring & Crosswalk Grid around Skyscraper Site
    const roadInnerR = 14;
    const roadOuterR = 26;
    const roadGeo = new THREE.RingGeometry(roadInnerR, roadOuterR, 64);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Asphalt Road
      roughness: 0.9,
      metalness: 0.15,
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.y = -0.48;
    roadMesh.receiveShadow = true;
    this.groundGroup.add(roadMesh);

    // White Lane Markings
    const laneGeo = new THREE.RingGeometry(20, 20.3, 64);
    const laneMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const laneMesh = new THREE.Mesh(laneGeo, laneMat);
    laneMesh.rotation.x = -Math.PI / 2;
    laneMesh.position.y = -0.46;
    this.groundGroup.add(laneMesh);

    // Sidewalk Concrete Curb
    const curbGeo = new THREE.RingGeometry(13.2, 14, 64);
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6 });
    const curbMesh = new THREE.Mesh(curbGeo, curbMat);
    curbMesh.rotation.x = -Math.PI / 2;
    curbMesh.position.y = -0.44;
    curbMesh.receiveShadow = true;
    this.groundGroup.add(curbMesh);
  }

  /**
   * Urban Vegetation (3D Trees, Planter Boxes, Grass Patches).
   */
  private createUrbanPlants(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 }); // Organic Green
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8 });

    // 1. Street Trees along Sidewalk Perimeter (24 Trees)
    const treeCount = 24;
    const treeRadius = 12.5;

    for (let i = 0; i < treeCount; i++) {
      const angle = (i / treeCount) * Math.PI * 2;
      const x = Math.sin(angle) * treeRadius;
      const z = Math.cos(angle) * treeRadius;

      const treeGroup = new THREE.Group();

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 2.2, 8);
      const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
      trunkMesh.position.y = 1.1;
      trunkMesh.castShadow = true;
      treeGroup.add(trunkMesh);

      // Layered Foliage Canopy
      for (let f = 0; f < 3; f++) {
        const folGeo = new THREE.ConeGeometry(1.2 - f * 0.25, 1.8, 8);
        const folMesh = new THREE.Mesh(folGeo, foliageMat);
        folMesh.position.y = 2.2 + f * 1.0;
        folMesh.castShadow = true;
        treeGroup.add(folMesh);
      }

      treeGroup.position.set(x, -0.4, z);
      this.plantGroup.add(treeGroup);
    }

    // 2. Corner Planter Boxes with Grass Patches
    const planterGeo = new THREE.BoxGeometry(3.5, 0.4, 3.5);
    const planterMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
    const planterPositions = [
      [9.5, 9.5],
      [-9.5, 9.5],
      [9.5, -9.5],
      [-9.5, -9.5],
    ];

    planterPositions.forEach(([px, pz]) => {
      const planterMesh = new THREE.Mesh(planterGeo, planterMat);
      planterMesh.position.set(px, -0.3, pz);
      planterMesh.castShadow = true;
      planterMesh.receiveShadow = true;
      this.plantGroup.add(planterMesh);

      // Grass Top
      const grassGeo = new THREE.BoxGeometry(3.3, 0.08, 3.3);
      const grassMesh = new THREE.Mesh(grassGeo, grassMat);
      grassMesh.position.set(px, -0.06, pz);
      this.plantGroup.add(grassMesh);
    });
  }

  /**
   * Scaled-Down & Pushed-Back City Skyline Ring.
   * (Buildings are smaller so the main skyscraper and skyline are clearly visible).
   */
  private createCitySkylineRing(): void {
    const buildingCount = 140;
    const minRadius = 80; // Pushed back further from central tower
    const maxRadius = 180;

    const baseBuildingGeo = new THREE.BoxGeometry(1, 1, 1);
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      metalness: 0.3,
    });

    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.3,
      roughness: 0.3,
    });
    this.cityWindowMaterials.push(windowMat);

    for (let i = 0; i < buildingCount; i++) {
      const angle = (i / buildingCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.06;
      const dist = minRadius + Math.random() * (maxRadius - minRadius);

      const width = 4 + Math.random() * 7;
      const depth = 4 + Math.random() * 7;
      // Reduced heights so main tower stands out prominently
      const height = 8 + Math.random() * 26;

      const x = Math.sin(angle) * dist;
      const z = Math.cos(angle) * dist;

      const mesh = new THREE.Mesh(baseBuildingGeo, buildingMat);
      mesh.scale.set(width, height, depth);
      mesh.position.set(x, height / 2 - 0.5, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.citySkylineGroup.add(mesh);
    }
  }

  private createStarfield(count: number): void {
    this.starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 350 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.85 + 0.1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      sizes[i] = Math.random() * 2.5 + 1.0;
      phases[i] = Math.random() * Math.PI * 2;
    }

    this.starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    this.starGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const starVertexShader = `
      attribute float size;
      attribute float phase;
      uniform float uTime;
      varying float vAlpha;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float twinkle = sin(uTime * 2.5 + phase) * 0.5 + 0.5;
        vAlpha = 0.3 + twinkle * 0.7;
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const starFragmentShader = `
      varying float vAlpha;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(1.0, 1.0, 1.0, intensity * vAlpha);
      }
    `;

    this.starMaterial = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });

    this.starField = new THREE.Points(this.starGeometry, this.starMaterial);
    this.group.add(this.starField);
  }

  public setTheme(theme: 'day' | 'night'): void {
    this.currentTheme = theme;

    let topColor: THREE.Color;
    let horizonColor: THREE.Color;
    let bottomColor: THREE.Color;
    let sunIntensity: number;
    let ambientIntensity: number;
    let hemiIntensity: number;
    let fogColor: number;

    if (theme === 'day') {
      topColor = new THREE.Color(0x1d4ed8);
      horizonColor = new THREE.Color(0x38bdf8);
      bottomColor = new THREE.Color(0xbae6fd);
      sunIntensity = 2.6;
      ambientIntensity = 1.1;
      hemiIntensity = 1.0;
      fogColor = 0xbae6fd;
      if (this.starField) this.starField.visible = false;
      if (this.sunMesh) this.sunMesh.visible = true;
      this.cloudGroup.visible = true;
    } else {
      topColor = new THREE.Color(0x020617);
      horizonColor = new THREE.Color(0x0f172a);
      bottomColor = new THREE.Color(0x020617);
      sunIntensity = 0.3;
      ambientIntensity = 0.5;
      hemiIntensity = 0.4;
      fogColor = 0x020617;
      if (this.starField) this.starField.visible = true;
      if (this.sunMesh) this.sunMesh.visible = false;
      this.cloudGroup.visible = false;
    }

    if (this.skyDomeMaterial) {
      this.skyDomeMaterial.uniforms.uTopColor.value.copy(topColor);
      this.skyDomeMaterial.uniforms.uHorizonColor.value.copy(horizonColor);
      this.skyDomeMaterial.uniforms.uBottomColor.value.copy(bottomColor);
    }

    this.sunLight.intensity = sunIntensity;
    this.ambientLight.intensity = ambientIntensity;
    this.hemisphereLight.intensity = hemiIntensity;
    if (this.scene.fog) {
      (this.scene.fog as THREE.FogExp2).color.setHex(fogColor);
    }

    this.cityWindowMaterials.forEach((mat) => {
      mat.emissiveIntensity = theme === 'night' ? 1.2 : 0.2;
    });
  }

  public toggleTheme(): 'day' | 'night' {
    const nextTheme = this.currentTheme === 'day' ? 'night' : 'day';
    this.setTheme(nextTheme);
    return nextTheme;
  }

  public updateEnvironment(timeOverride?: number | null): void {
    if (timeOverride !== undefined && timeOverride !== null) {
      const isNight = timeOverride < 6 || timeOverride >= 19;
      this.setTheme(isNight ? 'night' : 'day');
    }
  }

  /**
   * Render loop tick for cloud drifting & star animation.
   */
  public update(delta: number): void {
    if (this.starMaterial && this.currentTheme === 'night') {
      this.starMaterial.uniforms.uTime.value += delta;
    }

    // Slow atmospheric cloud drift
    if (this.cloudGroup && this.currentTheme === 'day') {
      this.cloudGroup.rotation.y += delta * 0.015;
    }
  }

  public dispose(): void {
    if (this.skyDomeMesh) {
      this.skyDomeMesh.geometry?.dispose();
    }
    this.skyDomeMaterial?.dispose();
    this.starGeometry?.dispose();
    this.starMaterial?.dispose();
    this.scene.remove(this.group);
  }
}
