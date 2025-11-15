import { Vector2D } from "../physics/vector";

export interface Planet {
  name: string;
  mass: number;
  pos: Vector2D;
  vel: Vector2D;
  color: string;
  radius: number; // в метрах
}
