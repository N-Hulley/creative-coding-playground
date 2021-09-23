import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { Colour } from "../utils/Colour";
interface BackgroundProps {
  backgroundColour: Colour;
}

export const Background: React.FC<BackgroundProps> = ({
  backgroundColour,
}: BackgroundProps) => {
  let mods: Array<Array<Module>> = [];

  let prevMouseX = -1;
  let prevMouseY = -1;
  let mousePrevState = false;

  let windowWasResized = false;
  let width = 0;
  let height = 0;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    width = p5.windowWidth;
    height = p5.windowHeight;
    p5.resizeCanvas(width, height);
    p5.stroke(255, 50);
    generateMods(p5);
  };

  const draw = (p5: p5Types) => {
    let mouseState = p5.mouseIsPressed;
    if (
      prevMouseX === p5.mouseX &&
      prevMouseY === p5.mouseY &&
      !(mousePrevState || mouseState) &&
      !windowWasResized
    )
      return;
    if (mouseState) {
      p5.background(
        backgroundColour.r,
        backgroundColour.b,
        backgroundColour.g,
        10
      );
    } else {
      p5.background(
        backgroundColour.r,
        backgroundColour.b,
        backgroundColour.g,
        100
      );
    }

    p5.strokeWeight(15);

    p5.translate(20, 20);
    for (let i = 0; i < mods.length; i++) {
      for (let j = 0; j < mods[i].length; j++) {
        mods[i][j].update();
        mods[i][j].draw();
      }
    }
    prevMouseX = p5.mouseX;
    prevMouseY = p5.mouseY;
    mousePrevState = mouseState;
  };
  const windowResized = (p5: p5Types) => {
    height = p5.windowHeight;
    width = p5.windowWidth;
    windowWasResized = true;
    p5.resizeCanvas(width, height);
    generateMods(p5);
  };
  const generateMods = (p5: p5Types) => {
    const wideCount = Math.round(width / 80);
    const highCount = Math.round(height / 80);

    const offsetX = width / wideCount;
    const offsetY = height / highCount;

    mods = [];
    for (let i = 0; i < wideCount; i++) {
      mods[i] = [];
      for (let j = 0; j < highCount; j++) {
        mods[i][j] = new Module({
          x: (0.25 + i) * offsetX,
          y: (j + 0.25) * offsetY,
          p5: p5,
        });
      }
    }
  };
  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{
        width: "100%",
        height: "100vh",
        zIndex: -1,
        margin: "0px",
        padding: "0px",
        top: "0px",
        right: "0px",
        background: `rgb(${backgroundColour.r}, ${backgroundColour.b}, ${backgroundColour.g}, ${backgroundColour.a})`,
      }}
    />
  );
};

const modLength = 20;

interface ModuleProps {
  x: number;
  y: number;
  p5: p5Types;
}
class Module {
  x: number = 5;
  y: number = 5;
  a: number = 0;
  p5: p5Types;

  constructor({ x, y, p5 }: ModuleProps) {
    this.x = x;
    this.y = y;
    this.p5 = p5;
  }
  update() {
    this.a = this.p5.atan2(this.p5.mouseY - this.y, this.p5.mouseX - this.x);
  }
  draw() {
    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.a);
    this.p5.line(-modLength, 0, modLength, 0);
    this.p5.pop();
  }
}
