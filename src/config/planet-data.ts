import { Vector2D } from "../physics/vector";

export interface PlanetConfig {
  name: string;
  mass: number;
  pos: Vector2D;
  vel: Vector2D;
  color: string;
  radius: number; // в метрах
}

export const PLANET_DATA: PlanetConfig[] = [
  {
    name: "Sun",
    mass: 1.989e30,
    pos: new Vector2D(0, 0),
    vel: new Vector2D(0, 0),
    color: "yellow",
    radius: 696340000,
  },
  {
    name: "Mercury",
    mass: 3.3011e23,
    pos: new Vector2D(5.791e10, 0),
    vel: new Vector2D(0, 47362),
    color: "gray",
    radius: 2439700,
  },
  {
    name: "Venus",
    mass: 4.8675e24,
    pos: new Vector2D(1.082e11, 0),
    vel: new Vector2D(0, 35020),
    color: "orange",
    radius: 6051800,
  },
  {
    name: "Earth",
    mass: 5.972e24,
    pos: new Vector2D(1.496e11, 0),
    vel: new Vector2D(0, 29783),
    color: "blue",
    radius: 6371000,
  },
  {
    name: "Mars",
    mass: 6.4171e23,
    pos: new Vector2D(2.279e11, 0),
    vel: new Vector2D(0, 24077),
    color: "red",
    radius: 3389500,
  },
  {
    name: "Jupiter",
    mass: 1.8982e27,
    pos: new Vector2D(7.785e11, 0),
    vel: new Vector2D(0, 13070),
    color: "brown",
    radius: 69911000,
  },
  {
    name: "Saturn",
    mass: 5.6834e26,
    pos: new Vector2D(1.434e12, 0),
    vel: new Vector2D(0, 9690),
    color: "gold",
    radius: 58232000,
  },
  {
    name: "Uranus",
    mass: 8.681e25,
    pos: new Vector2D(2.871e12, 0),
    vel: new Vector2D(0, 6810),
    color: "lightblue",
    radius: 25362000,
  },
  {
    name: "Neptune",
    mass: 1.0241e26,
    pos: new Vector2D(4.495e12, 0),
    vel: new Vector2D(0, 5430),
    color: "darkblue",
    radius: 24622000,
  },
];
