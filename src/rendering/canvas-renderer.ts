import { PlatformAdapter } from "../types/platform-adapter";
import { SIMULATION_CONFIG } from "../config/simulation-config";
import { Planet } from "../entities/planet";

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;

  private frameCount = 0;
  private fps = 0;
  private lastFpsUpdate = 0;

  constructor(canvas: HTMLCanvasElement, private platform: PlatformAdapter) {
    this.ctx = canvas.getContext("2d")!;
    this.resize(canvas);
    this.platform.onResize(() => this.resize(canvas));
  }

  private resize(canvas: HTMLCanvasElement) {
    this.width = this.platform.getWidth();
    this.height = this.platform.getHeight();

    canvas.width = this.width;
    canvas.height = this.height;

    this.renderPlanets([]);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  renderPlanets(planets: Planet[]) {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const scaleDist = SIMULATION_CONFIG.SCALE_DIST;
    const radiusScale = SIMULATION_CONFIG.PLANET_RADIUS_SCALE * scaleDist;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const planet of planets) {
      const x = centerX + planet.pos.x * scaleDist;
      const y = centerY + planet.pos.y * scaleDist;
      const visualRadius = planet.radius * radiusScale;

      this.ctx.beginPath();
      this.ctx.arc(x, y, visualRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = planet.color;
      this.ctx.fill();

      // Подпись
      this.ctx.font = "8px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText(planet.name, x, y + visualRadius + 15);
    }

    this.drawConfigs();
    this.drawFps();
  }

  private drawConfigs() {
    this.ctx.font = "10px Arial";
    this.ctx.textAlign = "left";

    this.ctx.fillText(`Скорость: ${SIMULATION_CONFIG.SIMULATION_DT}x`, 20, 20);

    this.ctx.fillText(
      `Размеры: ${SIMULATION_CONFIG.PLANET_RADIUS_SCALE}x`,
      20,
      40
    );

    this.ctx.fillText(`Масштаб: ${SIMULATION_CONFIG.SCALE_DIST} : 1`, 20, 60);
  }

  private drawFps() {
    const currentTime = performance.now();

    this.frameCount++;

    if (currentTime - this.lastFpsUpdate > 500) {
      this.fps = Math.round(
        (this.frameCount * 1000) / (currentTime - this.lastFpsUpdate)
      );

      this.frameCount = 0;
      this.lastFpsUpdate = currentTime;
    }

    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "right";

    this.ctx.fillStyle = "lime";
    this.ctx.fillText(`FPS: ${this.fps}`, this.width - 10, 20);

    if (this.fps < 30) {
      this.ctx.fillStyle = "red";
      this.ctx.fillText("LOW FPS!", this.width - 10, 40);
    }
  }
}
