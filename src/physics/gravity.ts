import { Planet } from "../entities/planet";
import { Vector2D } from "./vector";

export class GravityCalculator {
  static readonly G = 6.6743e-11; // м³·кг⁻¹·с⁻²

  static calculateAcceleration(planet: Planet, others: Planet[]): Vector2D {
    let acc = new Vector2D();

    for (const other of others) {
      if (other === planet) continue;

      const dx = other.pos.x - planet.pos.x;
      const dy = other.pos.y - planet.pos.y;
      const distSq = dx ** 2 + dy ** 2;

      if (distSq === 0) continue; // защита от деления на ноль

      const dist = Math.sqrt(distSq);
      const minDist = planet.radius + other.radius;

      // Проверка на столкновение
      if (dist < minDist) {
        console.warn(`Столкновение: ${planet.name} и ${other.name}`);
        continue;
      }

      const force = (this.G * other.mass) / distSq;
      acc = acc.add(new Vector2D((force * dx) / dist, (force * dy) / dist));
    }

    return acc;
  }
}
