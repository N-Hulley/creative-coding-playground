export interface ColourProps {
  r: number;
  g: number;
  b: number;
  a?: number;
}
export class Colour {
  static black = new Colour({ r: 0, g: 0, b: 0 });
  static white = new Colour({ r: 255, g: 255, b: 255 });
  static red = new Colour({ r: 255, g: 0, b: 0 });
  static green = new Colour({ r: 0, g: 255, b: 0 });
  static blue = new Colour({ r: 0, g: 0, b: 255 });

  r: number = 0;
  g: number = 0;
  b: number = 0;
  a?: number = 1;
  constructor({ r, g, b, a = 1 }: ColourProps) {
    this.r = r;
    this.b = b;
    this.g = g;
    this.a = a;
  }

  matches(other: Colour, includeAlpha = false) {
    return this.r === other.r && this.g === other.g && this.b === other.b;
  }
}
