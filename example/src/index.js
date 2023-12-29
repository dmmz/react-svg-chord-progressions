import React, { useEffect } from "react";
import { render } from "react-dom";
import { isMobile } from "react-device-detect";
import { useState, useRef } from "react";
import ChordProgression from "../../src/ChordProgression";
import aloneTogether from "./alone-together.js";
import "./style.css";

const selections = [
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
];

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

  const [okDimMsg, setOkDimMsg] = useState(false);

  const updateDimensions = () => {
    window.dispatchEvent(new CustomEvent("chords-height-update"));
    setOkDimMsg(true);
    setTimeout(() => setOkDimMsg(false), 1000);
  };

  const topScrollableElemRef = useRef(null);

  const mobileScroll = () => {
    if (isMobile) {
      window.scrollBy({
        top: topScrollableElemRef?.current?.getBoundingClientRect().top - 150,
        behavior: "smooth",
      });

      const scrollHandler = () => {
        window.dispatchEvent(new CustomEvent("chords-height-update"));
        window.removeEventListener("scrollend", scrollHandler);
      };

      window.addEventListener("scrollend", scrollHandler);
    }
  };

  return (
    <div width="1000">
      <div id="header">
        <h1>ChordProgression example</h1>
        <p>Score scrolls following cursor if score overflows viewport.</p>
        <div id="content">
          <div>
            <div id="youtube" />
            <div ref={topScrollableElemRef} id="player">
              <button
                onClick={() => {
                  if (!isPlaying) {
                    mobileScroll();
                  }
                  toggleIsPlaying();
                }}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={stop}>Stop</button>
              <button onClick={toggleShowSelections}>
                {showSelections ? "Hide Sel." : "Show Sel."}
              </button>
              <button onClick={updateDimensions}>Update dim.</button>
            </div>
            <div class="msg-wrapper">
              <div className={`fade-out${!okDimMsg ? "-hidden" : ""}`}>
                Updated
              </div>
            </div>
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
            selections={showSelections && selections}
          />
        </div>
      </div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return <Example />;
  }
}

render(<App />, document.getElementById("root"));
