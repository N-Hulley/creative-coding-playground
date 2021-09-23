import React, { useState } from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { Bubble } from "../utils/Bubble";
import { Colour } from "../utils/Colour";
import { Vector2 } from "../utils/Vector";
interface ImageBubbleProps {
  imagePath: string;
  ratio: number;
  ignoreColours?: Array<Colour>;
}

export const ImageBubbles: React.FC<ImageBubbleProps> = ({
  imagePath,
  ratio,
  ignoreColours,
}: ImageBubbleProps) => {
  // let windowWasResized = false;s
  let bubbles: Array<Array<Bubble>>;
  let width = 0;
  let height = 0;
  let image: p5Types.Image;
  const preload = (p5: p5Types) => {
    image = p5.loadImage(imagePath);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    width = p5.windowWidth;
    height = p5.windowHeight;
    p5.resizeCanvas(width, height);
    p5.stroke(0, 50);
    p5.fill(0, 1);
    // p5.image(image, 0, 0);
  };

  const draw = (p5: p5Types) => {
    if (!bubbles || bubbles.length <= 0) if (!generateBubbles(p5)) return;

    p5.background(255, 5);
    // p5.circle(p5.mouseX, p5.mouseY, 20);
    const mouse = new Vector2({ x: p5.mouseX, y: p5.mouseY });
    p5.noStroke();
    for (let i = 0; i < bubbles.length; i++) {
      for (let j = 0; j < bubbles[i].length; j++) {
        bubbles[i][j]?.draw(mouse);
      }
    }
  };
  const windowResized = (p5: p5Types) => {
    height = p5.windowHeight;
    width = p5.windowWidth;
    // windowWasResized = true;
    p5.resizeCanvas(width, height);
    p5.image(image, 0, 0);

    generateBubbles(p5);
  };

  const generateBubbles = (p5: p5Types) => {
    if (!image) return false;
    const scale = ratio;
    const wideCount = Math.round(image.width / scale);
    const highCount = Math.round(image.height / scale);
    // const offsetX = image.width / wideCount - scale / 2 ;
    // const offsetY = image.height / highCount - scale / 2;
    const offsetX = 0;
    const offsetY = 0;
    bubbles = [];
    for (let i = 0; i < image.width / scale; i += 1) {
      bubbles[i] = [];

      for (let j = 0; j < image.height / scale; j += 1) {
        const col = image.get(i * scale + offsetX, j * scale + offsetY);
        const colour = new Colour({
          r: col[0],
          g: col[1],
          b: col[2],
          a: col[3],
        });
        if (ignoreColours) {
          let skip = false;
          for (let x = 0; x < ignoreColours.length; x++) {
            if (colour.matches(ignoreColours[x])) continue;
          }
          if (skip) continue;
        }
        if (!colour.matches(Colour.white) && !colour.matches(Colour.black))
          bubbles[i].push(
            new Bubble(
              i,
              j,
              scale,
              new Vector2({
                x: i * scale + offsetX,
                y: j * scale + offsetY,
              }),
              colour,
              p5
            )
          );
      }
    }
  };

  return (
    <>
      {/* <progress
        value={loadingPercent}
        max={100}
      >
        {loadingPercent}
      </progress> */}

      <Sketch
        setup={setup}
        draw={draw}
        preload={preload}
        windowResized={windowResized}
        style={{
          width: "100%",
          height: "100vh",
          zIndex: -1,
          margin: "0px",
          padding: "0px",
          top: "0px",
          right: "0px",
        }}
      />
    </>
  );
};
