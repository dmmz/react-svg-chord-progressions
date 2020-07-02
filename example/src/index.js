import React from "react";
import { render } from "react-dom";
import ChordProgression from "../../src/ChordProgression";
import aloneTogether from "./alone-together.js";
import "./style.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <p>This is a ChordProgression example</p>
        <ChordProgression
          bars={aloneTogether}
          colorActive={"#00f"}
          activeBar={2}
          colorSelected={"#aa0"}
          selectedBars={[1, 4]}
          barMouseDown={() => console.log("mouse down")}
          barMouseOver={() => console.log("mouse over")}
          barMouseUp={() => console.log("mouse up")}
          selections={[
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
          ]}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
