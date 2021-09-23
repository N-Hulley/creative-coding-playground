import React, { useState } from "react";
import "./App.css";
import { Background } from "./lib/components/DynamicBackground";
import { ImageBubbles } from "./lib/components/ImageBubbles";
import lexerUrl from "./lexer.png";
import dinoUrl from "./dino.jpg";

import { Colour } from "./lib/utils/Colour";
const Canvases = [
  <ImageBubbles imagePath={dinoUrl} ratio={10} key={1}></ImageBubbles>,

  <ImageBubbles
    imagePath={lexerUrl}
    ratio={3}
    ignoreColours={[Colour.white, Colour.black]}
    key={2}
  ></ImageBubbles>,
  <Background
    backgroundColour={new Colour({ r: 0, g: 190, b: 183, a: 1 })}
    key={3}
  ></Background>,
  <Background
    backgroundColour={new Colour({ r: 55, g: 55, b: 55, a: 1 })}
    key={4}
  ></Background>,
];

const App = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="App">
      <div className="increment-panel">
        <button onClick={() => setIndex(index - 1)} disabled={index <= 0}>
          {index <= 0 ? "-" : "↑"}
        </button>

        <button
          onClick={() => setIndex(index + 1)}
          disabled={index >= Canvases.length - 1}
        >
          {index >= Canvases.length - 1 ? "-" : "↓"}
        </button>
      </div>
      {Canvases[index]}
    </div>
  );
};

export default App;
