import React from "react";
import { storiesOf } from "@storybook/react";
import ChordProgression from "../src/ChordProgression";
import aloneTogether from "./chord-progressions/alone-together";
import "../example/src/style.css";

const XSMALL = 250;
const SMALL = 420;
const MEDIUM = 768;
const large = 992;
storiesOf("ChordProgression", module)
  .add("desktop", () => {
    return <ChordProgression bars={aloneTogether} />;
  })
  .add("inside a div for x-small devices", () => {
    return (
      <div style={{ width: XSMALL }}>
        <ChordProgression bars={aloneTogether} />
      </div>
    );
  })
  .add("inside a div for small devices", () => {
    return (
      <div style={{ width: SMALL }}>
        <ChordProgression bars={aloneTogether} />
      </div>
    );
  })
  .add("inside a div for medium devices", () => {
    return (
      <div style={{ width: MEDIUM }}>
        <ChordProgression bars={aloneTogether} />
      </div>
    );
  })
  .add("inside a div for small devices", () => {
    return (
      <div style={{ width: SMALL }}>
        <ChordProgression bars={aloneTogether} />
      </div>
    );
  });
