import React from "react";
import ChordProgression from "../src/ChordProgression";
import aloneTogether from "../__tests__/chord-progressions/alone-together";
import "../example/src/style.css";

const XSMALL = "320px";
const SMALL = "480px";
const MEDIUM = "768px";

// More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
export default {
  title: "ChordProgression",
  component: ChordProgression,
};

export const Desktop = () => <ChordProgression bars={aloneTogether} />;

export const XSmallDevices = () => (
  <div style={{ width: XSMALL }}>
    <ChordProgression bars={aloneTogether} />
  </div>
);

export const SmallDevices = () => (
  <div style={{ width: SMALL }}>
    <ChordProgression bars={aloneTogether} />
  </div>
);

export const MediumDevices = () => (
  <div style={{ width: MEDIUM }}>
    <ChordProgression bars={aloneTogether} />
  </div>
);

export const LargeDevices = () => (
  <div style={{ width: "100%" }}>
    <ChordProgression bars={aloneTogether} />
  </div>
);
