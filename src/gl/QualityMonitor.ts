export type QualityTier = 'high' | 'medium' | 'low';

export type QualityChangeCallback = (tier: QualityTier, fps: number) => void;

/**
 * QualityMonitor tracks rendering performance over a rolling window of 30 frames
 * and determines the current QualityTier ('high' ~60fps, 'medium' ~45fps, 'low' <35fps).
 */
export class QualityMonitor {
  private frameTimes: number[] = [];
  private readonly maxFrames: number = 30;
  private lastTime: number = 0;
  private currentTier: QualityTier = 'high';
  private callbacks: Set<QualityChangeCallback> = new Set();
  private currentFps: number = 60;

  constructor() {
    this.lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  }

  /**
   * Ticks frame timer and recalculates rolling FPS.
   * @param now Current timestamp in milliseconds (e.g. performance.now() or RAF timestamp)
   */
  public tick(now: number): QualityTier {
    if (this.lastTime === 0) {
      this.lastTime = now;
      return this.currentTier;
    }

    const delta = now - this.lastTime;
    this.lastTime = now;

    // Ignore invalid or background tab frame delays (> 1000ms)
    if (delta > 0 && delta < 1000) {
      this.frameTimes.push(delta);
      if (this.frameTimes.length > this.maxFrames) {
        this.frameTimes.shift();
      }
    }

    // Evaluate tier once we have a rolling sample set (at least 15 frames)
    if (this.frameTimes.length >= 15) {
      const totalDelta = this.frameTimes.reduce((sum, time) => sum + time, 0);
      const avgDelta = totalDelta / this.frameTimes.length;
      this.currentFps = avgDelta > 0 ? 1000 / avgDelta : 60;

      const newTier = this.evaluateQualityTier(this.currentFps);

      if (newTier !== this.currentTier) {
        this.currentTier = newTier;
        this.notifyCallbacks(newTier, Math.round(this.currentFps));
      }
    }

    return this.currentTier;
  }

  /**
   * Maps current FPS to QualityTier with hysteresis to prevent frequent tier flapping.
   */
  private evaluateQualityTier(fps: number): QualityTier {
    if (this.currentTier === 'high') {
      if (fps < 35) return 'low';
      if (fps < 52) return 'medium';
      return 'high';
    } else if (this.currentTier === 'medium') {
      if (fps < 35) return 'low';
      if (fps >= 57) return 'high';
      return 'medium';
    } else {
      // 'low'
      if (fps >= 57) return 'high';
      if (fps >= 40) return 'medium';
      return 'low';
    }
  }

  /**
   * Gets current QualityTier.
   */
  public getQualityTier(): QualityTier {
    return this.currentTier;
  }

  /**
   * Gets current calculated FPS.
   */
  public getFPS(): number {
    return Math.round(this.currentFps);
  }

  /**
   * Registers a quality tier change callback.
   * @param cb Callback function receiving new QualityTier and current FPS
   * @returns Unsubscribe function
   */
  public onQualityChange(cb: QualityChangeCallback): () => void {
    this.callbacks.add(cb);
    return () => {
      this.callbacks.delete(cb);
    };
  }

  private notifyCallbacks(tier: QualityTier, fps: number): void {
    this.callbacks.forEach((cb) => {
      try {
        cb(tier, fps);
      } catch (err) {
        console.error('[QualityMonitor] Error in quality change listener:', err);
      }
    });
  }

  /**
   * Resets monitor state.
   */
  public reset(): void {
    this.frameTimes = [];
    this.lastTime = 0;
    this.currentTier = 'high';
    this.currentFps = 60;
  }
}
