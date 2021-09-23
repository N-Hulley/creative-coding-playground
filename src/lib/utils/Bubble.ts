import p5Types, { Vector } from "p5";
import { Colour } from "./Colour";
import { Vector2, Vector3 } from "./Vector";

export class Bubble {
  i: number;
  j: number;
  currentPos: Vector2 = new Vector2({ x: 0, y: 0 });
  targetPos: Vector2 = new Vector2({ x: 0, y: 0 });
  velocity: Vector2;
  acceleration: Vector2;
  colour: Colour = Colour.red;
  size = 10;
  p5: p5Types;
  constructor(
    i: number,
    j: number,
    scale: number,
    position: Vector2,
    colour: Colour,
    p5: p5Types
  ) {
    this.size = scale + 3;
    this.i = i;
    this.j = j;
    this.currentPos = this.targetPos = position;

    this.velocity = new Vector2({ x: 0, y: 0 });
    this.acceleration = new Vector2({ x: 0, y: 0 });
    this.colour = colour;
    this.p5 = p5;
  }
  draw(mouse: Vector2) {
    this.update(mouse);
    this.render();
  }
  update(mouse: Vector2) {
    this.velocity.mult(0.966);
    if (this.p5.mouseIsPressed) {
      const dist = Vector2.dist(this.currentPos, mouse);
      if (dist < effectDist) {
        this.acceleration = Vector2.sub(this.currentPos, mouse);
        this.acceleration.mult((effectDist / dist) * 0.01);
      }
    }

    this.acceleration.add(
      Vector2.mult(Vector2.sub(this.targetPos, this.currentPos), 0.01)
    );
    this.velocity.add(this.acceleration);
    this.currentPos = Vector2.add(this.currentPos, this.velocity);

    Vector2.zeroize(this.acceleration);
  }
  render() {
    this.p5.fill(this.colour.r, this.colour.g, this.colour.b);
    this.p5.circle(this.currentPos.x, this.currentPos.y, this.size);
  }
}
const effectDist = 200;
