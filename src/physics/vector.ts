export interface Vector {
  x: number;
  y: number;
}

export class Vector2D implements Vector {
  constructor(public x: number = 0, public y: number = 0) {}

  add(v: Vector): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
