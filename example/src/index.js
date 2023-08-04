import React, { useEffect } from "react";
import { render } from "react-dom";
import { useState, useRef } from "react";
import ChordProgression from "../../src/ChordProgression";
import aloneTogether from "./alone-together.js";
import "./style.css";

const usePlayer = (maxBars) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const [barNum, setBarNum] = useState(null);

  const toggleIsPlaying = () => setIsPlaying((isPlaying) => !isPlaying);
  const stop = () => {
    setIsPlaying(false);
    setBarNum(null);
  };

  useEffect(() => {
    if (isPlaying) {
      playerRef.current = setInterval(() => {
        setBarNum((barNum) =>
          barNum === null || barNum === maxBars ? 0 : ++barNum
        );
      }, 250);
    } else {
      clearInterval(playerRef.current);
    }
    return () => clearInterval(playerRef.current);
  }, [isPlaying]);
  return { barNum, isPlaying, toggleIsPlaying, stop };
};

const foldedAloneTogetherBars = 32;

const Example = () => {
  const [showSelections, setShowSelections] = useState(false);
  const { barNum, isPlaying, toggleIsPlaying, stop } = usePlayer(
    foldedAloneTogetherBars
  );

  const toggleShowSelections = () =>
    setShowSelections((showSelections) => !showSelections);

  return (
    <div>
      <div id="header">
        <h1>ChordProgression example</h1>
        <p>Score scrolls following cursor if score overflows viewport.</p>
        <button onClick={toggleIsPlaying}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={stop}>Stop</button>
        <button onClick={toggleShowSelections}>
          {showSelections ? "Hide selections" : "Show selections"}
        </button>
      </div>
      <ChordProgression
        bars={aloneTogether}
        colorActive={"#00f"}
        activeBar={barNum}
        colorSelected={"#aa0"}
        selectedBars={showSelections && [1, 4]}
        barMouseDown={() => console.log("mouse down")}
        barMouseOver={() => console.log("mouse over")}
        barMouseUp={() => console.log("mouse up")}
        selections={
          showSelections && [
            {
              start: { chord: 0, bar: 10 },
              end: { chord: 1, bar: 11 },
              color: "#500",
            },
            {
              start: { chord: 0, bar: 14 },
              end: { chord: 0, bar: 18 },
              color: "#060",
            },
          ]
        }
      />
    </div>
  );
};

class App extends React.Component {
  render() {
    return <Example />;
  }
}

render(<App />, document.getElementById("root"));
