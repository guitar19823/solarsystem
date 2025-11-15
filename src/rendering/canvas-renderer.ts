import { Planet } from "../entities/planet";

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  renderPlanets(planets: Planet[]): void {
    // Адаптивный масштаб: берём максимальную координату среди планет
    const maxCoord = Math.max(
      ...planets.map((p) => Math.abs(p.pos.x)),
      ...planets.map((p) => Math.abs(p.pos.y))
    );
    const scale = (this.width * 0.8) / (2 * maxCoord);
    // const radiusScale = 1e7; // коэффициент для визуализации радиусов

    const radiusScale = 0.05;

    for (const planet of planets) {
      const x = this.width / 2 + planet.pos.x * scale;
      const y = this.height / 2 + planet.pos.y * scale;
      const radius = (planet.radius / radiusScale) * scale;

      // Рисуем планету
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = planet.color; // Установка цвета
      this.ctx.fill(); // Заливка

      // Подпись
      this.ctx.font = "12px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText(planet.name, x, y + radius + 15);
    }
  }
}
