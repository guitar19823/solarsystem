import { Planet } from "../entities/planet";
import { Vector2D } from "./vector";

export class GravityCalculator {
  static readonly G = 6.6743e-11; // м³·кг⁻¹·с⁻²

  static calculateAcceleration(planet: Planet, others: Planet[]) {
    let acc = new Vector2D();

    for (const other of others) {
      if (other === planet) continue;

      // Переиспользуем расстояние
      const dx = other.pos.x - planet.pos.x;
      const dy = other.pos.y - planet.pos.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < 1e-20) continue; // вместо distSq === 0

      const dist = Math.sqrt(distSq);
      const minDist = planet.radius + other.radius;

      if (dist < minDist) {
        console.warn(`Столкновение: ${planet.name} и ${other.name}`);
        continue;
      }

      // Вычисляем силу один раз
      const forceFactor = (this.G * other.mass) / (dist * distSq); // G*m/r³
      acc = acc.add(new Vector2D(forceFactor * dx, forceFactor * dy));
    }

    return acc;
  }
}
