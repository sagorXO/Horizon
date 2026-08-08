import * as THREE from 'three';

/**
 * Environment module — lighting-only configuration for transparent canvas overlay.
 * The photorealistic city backdrop image handles sky, ground, and surrounding buildings.
 * This module provides only the lights that illuminate the 3D building assembly.
 */
export class Environment {
  public group: THREE.Group;
  private scene: THREE.Scene;

  // Lighting Components
  private sunLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private hemisphereLight: THREE.HemisphereLight;

  // Active theme state
  public currentTheme: 'day' | 'night' = 'day';

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'EnvironmentGroup';

    // CRITICAL: No scene.background or scene.fog — canvas is transparent over backdrop image
    this.scene.background = null;
    this.scene.fog = null;

    // 1. Solar Directional Light — warm sunlight matching the backdrop image lighting direction
    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 3.5);
    this.sunLight.position.set(100, 160, 60);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 450;
    const shadowSize = 60;
    this.sunLight.shadow.camera.left = -shadowSize;
    this.sunLight.shadow.camera.right = shadowSize;
    this.sunLight.shadow.camera.top = shadowSize;
    this.sunLight.shadow.camera.bottom = -shadowSize;
    this.sunLight.shadow.bias = -0.00015;
    this.sunLight.shadow.radius = 4.0;
    this.group.add(this.sunLight);

    // 2. Hemisphere sky/ground fill light — matches sky blue tones of the backdrop
    this.hemisphereLight = new THREE.HemisphereLight(0x9bb3c4, 0x334155, 1.2);
    this.group.add(this.hemisphereLight);

    // 3. Secondary fill light — soft counter-directional fill for shadow side of building
    this.fillLight = new THREE.DirectionalLight(0x7a9bb0, 0.8);
    this.fillLight.position.set(-50, 60, -50);
    this.group.add(this.fillLight);

    // 4. Ambient base light — ensures building is never completely dark
    this.ambientLight = new THREE.AmbientLight(0x9bb3c4, 0.6);
    this.group.add(this.ambientLight);

    this.scene.add(this.group);
    this.setTheme('day');
  }

  public setTheme(theme: 'day' | 'night'): void {
    this.currentTheme = theme;

    // Ensure transparent canvas — no background or fog
    this.scene.background = null;
    this.scene.fog = null;

    if (theme === 'day') {
      this.sunLight.intensity = 3.5;
      this.sunLight.color.set(0xfffbeb);
      this.ambientLight.intensity = 0.6;
      this.hemisphereLight.intensity = 1.2;
      this.fillLight.intensity = 0.8;
    } else {
      this.sunLight.intensity = 0.5;
      this.sunLight.color.set(0x4466aa);
      this.ambientLight.intensity = 0.3;
      this.hemisphereLight.intensity = 0.4;
      this.fillLight.intensity = 0.3;
    }
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

  public update(_delta: number): void {
    // No-op — lighting is static, no animated sky dome or clouds needed
  }

  public dispose(): void {
    this.scene.remove(this.group);
  }
}
