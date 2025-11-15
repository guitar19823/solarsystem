import { CelestialBody } from "./celestial-body";
import { GravityCalculator } from "../physics/gravity";

export class Planet extends CelestialBody {
  update(dt: number, others: Planet[]): void {
    const acc = GravityCalculator.calculateAcceleration(this, others);
    this.vel = this.vel.add(acc.multiply(dt));
    this.pos = this.pos.add(this.vel.multiply(dt));
  }
}
