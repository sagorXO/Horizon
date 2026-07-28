import * as THREE from 'three';
import { QualityMonitor, QualityTier } from './QualityMonitor';

export type RenderCallback = (delta: number, now: number) => void;

/**
 * WebGL Engine core singleton class for three.js real-time luxury skyscraper rendering.
 */
export class Engine {
  private static instance: Engine | null = null;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private container: HTMLElement | null = null;
  private qualityMonitor: QualityMonitor;

  private rafId: number | null = null;
  private isRunning: boolean = false;
  private isDisposed: boolean = false;

  private renderCallbacks: Set<RenderCallback> = new Set();
  private resizeObserver: ResizeObserver | null = null;

  private currentShadowMapSize: number = 2048;
  private maxDprCap: number = 2;

  constructor(container?: HTMLElement) {
    this.qualityMonitor = new QualityMonitor();
    this.scene = new THREE.Scene();
    this.setupCamera();
    this.setupRenderer();
    this.setupQualityMonitor();

    if (container) {
      this.mount(container);
    }
  }

  /**
   * Returns or creates Singleton instance of Engine.
   */
  public static getInstance(container?: HTMLElement): Engine {
    if (!Engine.instance || Engine.instance.isDisposed) {
      Engine.instance = new Engine(container);
    } else if (container && Engine.instance.container !== container) {
      Engine.instance.mount(container);
    }
    return Engine.instance;
  }

  private setupCamera(): void {
    // PerspectiveCamera (fov: 45, near: 0.1, far: 1000, pos: [35, 12, 35])
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(35, 12, 35);
    this.camera.lookAt(0, 0, 0);
  }

  private setupRenderer(): void {
    // Probe WebGL context creation support before instantiating WebGLRenderer
    if (typeof window !== 'undefined') {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) {
          throw new Error('WebGL context is disabled or unsupported in this browser environment.');
        }
      } catch (err) {
        throw new Error('WebGL context initialization failed: ' + (err instanceof Error ? err.message : String(err)));
      }
    }

    // Initialize WebGLRenderer with alpha: true, antialias: true, powerPreference: 'high-performance'
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    // Set pixel ratio capped at min(window.devicePixelRatio, 2)
    const initialDpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, this.maxDprCap);
    this.renderer.setPixelRatio(initialDpr);

    // Tone mapping: THREE.ACESFilmicToneMapping, exposure: 1.25
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // Shadows: renderer.shadowMap.enabled = true, type: THREE.PCFShadowMap
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    // Color space configuration
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  /**
   * Mounts the engine to a DOM container element.
   */
  public mount(container: HTMLElement): void {
    if (this.isDisposed) {
      throw new Error('Cannot mount a disposed Engine instance.');
    }

    if (this.container === container) return;

    if (this.container && this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }

    this.container = container;
    this.container.appendChild(this.renderer.domElement);

    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';

    this.setupResizeHandler();
    this.handleResize();
    this.start();
  }

  private setupResizeHandler(): void {
    this.handleResize = this.handleResize.bind(this);

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
      window.addEventListener('resize', this.handleResize);
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.container && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.handleResize());
      this.resizeObserver.observe(this.container);
    }
  }

  /**
   * Resize handler updating camera aspect & renderer viewport.
   */
  public handleResize = (): void => {
    if (!this.renderer || !this.camera) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    if (this.container) {
      width = this.container.clientWidth || width;
      height = this.container.clientHeight || height;
    }

    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, this.maxDprCap);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
  };

  private setupQualityMonitor(): void {
    this.qualityMonitor.onQualityChange((tier: QualityTier) => {
      this.handleQualityTierChange(tier);
    });
  }

  /**
   * Dynamic quality adjustments based on rolling QualityTier.
   * Adjusts DPR and shadow map sizes (2048 -> 1024).
   */
  private handleQualityTierChange(tier: QualityTier): void {
    if (!this.renderer) return;

    let targetDprCap = 2;
    let targetShadowSize = 2048;

    switch (tier) {
      case 'high':
        targetDprCap = 2;
        targetShadowSize = 2048;
        this.renderer.shadowMap.enabled = true;
        break;
      case 'medium':
        targetDprCap = 1.5;
        targetShadowSize = 1024;
        this.renderer.shadowMap.enabled = true;
        break;
      case 'low':
        targetDprCap = 1.0;
        targetShadowSize = 1024;
        this.renderer.shadowMap.enabled = true;
        break;
    }

    this.maxDprCap = targetDprCap;

    const deviceDpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const effectiveDpr = Math.min(deviceDpr, targetDprCap);
    this.renderer.setPixelRatio(effectiveDpr);

    if (targetShadowSize !== this.currentShadowMapSize) {
      this.currentShadowMapSize = targetShadowSize;
      this.updateSceneShadowMapSize(targetShadowSize);
    }
  }

  private updateSceneShadowMapSize(size: number): void {
    if (!this.scene) return;

    this.scene.traverse((object) => {
      const light = object as any;
      if (light && light.isLight && light.shadow) {
        light.shadow.mapSize.width = size;
        light.shadow.mapSize.height = size;
        if (light.shadow.map) {
          light.shadow.map.dispose();
          light.shadow.map = null;
        }
      }
    });
    this.renderer.shadowMap.needsUpdate = true;
  }

  /**
   * Updates camera position and orientation based on normalized scroll progress (0.0 to 1.0)
   */
  public updateCameraFromProgress(progress: number): void {
    if (!this.camera) return;

    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const zoomP = THREE.MathUtils.clamp(p / 0.5, 0, 1);
    const panP = THREE.MathUtils.clamp((p - 0.75) / 0.25, 0, 1);

    const targetX = THREE.MathUtils.lerp(45, 18, zoomP);
    const targetZ = THREE.MathUtils.lerp(45, 22, zoomP);
    const targetY = THREE.MathUtils.lerp(15, 5, zoomP) + THREE.MathUtils.lerp(0, 30, panP);

    this.camera.position.set(targetX, targetY, targetZ);

    const lookY = THREE.MathUtils.lerp(0, 8, zoomP) + THREE.MathUtils.lerp(0, 25, panP);
    this.camera.lookAt(0, lookY, 0);
  }

  /**
   * Single RAF Ticker Loop
   */
  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    let lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

    const loop = (now: number) => {
      if (!this.isRunning || this.isDisposed) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Tick quality monitor
      this.qualityMonitor.tick(now);

      // Execute external render callbacks
      this.renderCallbacks.forEach((cb) => {
        try {
          cb(delta, now);
        } catch (err) {
          console.error('[Engine] Error in render callback:', err);
        }
      });

      // Render Three.js scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Adds a callback to run on each frame before rendering.
   */
  public addRenderCallback(cb: RenderCallback): () => void {
    this.renderCallbacks.add(cb);
    return () => {
      this.renderCallbacks.delete(cb);
    };
  }

  public addUpdateCallback(cb: RenderCallback): () => void {
    return this.addRenderCallback(cb);
  }

  // --- Getters ---

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public getContainer(): HTMLElement | null {
    return this.container;
  }

  public getQualityMonitor(): QualityMonitor {
    return this.qualityMonitor;
  }

  /**
   * Clean dispose() method clearing WebGL context and releasing all resources.
   */
  public dispose(): void {
    this.stop();

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.scene) {
      this.scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) {
            mesh.geometry.dispose();
          }
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => this.disposeMaterial(mat));
            } else {
              this.disposeMaterial(mesh.material);
            }
          }
        }
      });
      this.scene.clear();
    }

    if (this.renderer) {
      if (this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }

    this.renderCallbacks.clear();
    this.container = null;
    this.isDisposed = true;

    if (Engine.instance === this) {
      Engine.instance = null;
    }
  }

  private disposeMaterial(material: THREE.Material): void {
    material.dispose();
    for (const key of Object.keys(material)) {
      const value = (material as any)[key];
      if (value && typeof value === 'object' && 'isTexture' in value) {
        (value as THREE.Texture).dispose();
      }
    }
  }
}

// Export default singleton instance getter function for convenience
export const getEngine = (container?: HTMLElement): Engine => Engine.getInstance(container);
