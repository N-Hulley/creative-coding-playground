import p5 from "p5";

// export type Position: Vector2 | Vector3;
export type VectorProps =
  | {
      x: number;
      y: number;
    }
  | {
      x: number;
      y: number;
      z: number;
    };

export class Vector3 extends p5.Vector {
  x: number = 0;
  y: number = 0;
  z: number = 0;
}

export class Vector2 extends p5.Vector {
  x: number = 0;
  y: number = 0;
  static zeroize(vector: Vector2) {
    vector.x = 0;
    vector.y = 0;
  }
  static zero = new Vector2({ x: 0, y: 0 });
  constructor({ x, y }: VectorProps) {
    super();
    this.x = x;
    this.y = y;
  }
}
