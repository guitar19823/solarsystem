import { Vector2D } from "../physics/vector";
import { Planet } from "./planet.interface";

export abstract class CelestialBody implements Planet {
  constructor(
    public name: string,
    public mass: number,
    public pos: Vector2D,
    public vel: Vector2D,
    public color: string,
    public radius: number
  ) {}

  abstract update(dt: number, others: Planet[]): void;
}
