import { Planet } from "../entities/planet";
import { PLANET_DATA } from "../config/planet-data";

export class SolarSystem {
  private planets: Planet[] = [];
  private dt: number;

  constructor(dt: number = 86400) {
    this.dt = dt;
    this.initPlanets();
  }

  private initPlanets(): void {
    // Создаём планеты на основе конфигурационных данных
    for (const config of PLANET_DATA) {
      this.planets.push(
        new Planet(
          config.name,
          config.mass,
          config.pos,
          config.vel,
          config.color,
          config.radius
        )
      );
    }
  }

  getPlanets(): Planet[] {
    return this.planets;
  }

  step(): void {
    const planetsCopy = [...this.planets];
    for (const planet of this.planets) {
      planet.update(this.dt, planetsCopy);
    }
  }
}
