let bars = [
  {
    section: "Intro",
    timeSignature: "44",
    repeat: "forward",
    chords: [
      { pitch: "E", bass: "/Ab", chordType: "-6", duration: "half" },
      { pitch: "C", bass: "/G", chordType: "7", duration: "half" }
    ]
  },
  {
    chords: [
      { pitch: "E", chordType: "dim", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ]
  },
  { chords: [{ pitch: "D", chordType: "-6", duration: "whole" }] },
  {
    chords: [
      { pitch: "E", chordType: "halfdim", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ]
  },
  { chords: [{ pitch: "D", chordType: "-6", duration: "whole" }] },
  {
    chords: [
      { pitch: "A", chordType: "halfdim", duration: "half" },
      { pitch: "D", chordType: "7", sup: "(b9)", duration: "half" }
    ]
  },
  { chords: [{ pitch: "G", chordType: "dim", duration: "whole" }] },
  { chords: [{ same: true }] },
  {
    chords: [
      { pitch: "B", chordType: "-7", duration: "half" },
      { pitch: "E", chordType: "7", duration: "half" }
    ]
  },
  {
    chords: [
      { pitch: "G", chordType: "-7", duration: "half" },
      { pitch: "C", chordType: "7", duration: "half" }
    ]
  },
  { chords: [{ pitch: "F", chordType: "maj7", duration: "whole" }] },
  {
    chords: [
      { pitch: "E", chordType: "halfdim", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ]
  },
  { chords: [{ pitch: "D", chordType: "maj7", duration: "whole" }], ending: 1 },
  { chords: [{ same: true }], repeat: "backward" },
  { chords: [{ same: true }], ending: 2 },
  { chords: [{ same: true }], endSection: true },
  {
    section: "B",
    startSection: true,
    chords: [{ pitch: "A", chordType: "halfdim", duration: "whole" }]
  },
  { chords: [{ pitch: "D", chordType: "7", sup: "(b9)", duration: "whole" }] },
  { chords: [{ pitch: "G", chordType: "-6", duration: "whole" }] },
  { chords: [{ same: true }] },
  { chords: [{ pitch: "G", chordType: "halfdim", duration: "whole" }] },
  { chords: [{ pitch: "C", chordType: "7", sup: "(b9)", duration: "whole" }] },
  { chords: [{ pitch: "F", chordType: "maj7", duration: "whole" }] },
  {
    chords: [
      { pitch: "E", chordType: "halfdim", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ],
    endSection: true
  },
  {
    section: "A",
    startSection: true,
    chords: [{ pitch: "D", chordType: "-6", duration: "whole" }]
  },
  {
    chords: [
      { pitch: "E", chordType: "halfdim", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ]
  },
  { chords: [{ pitch: "D", chordType: "-6", duration: "whole" }] },
  {
    chords: [
      { pitch: "E", chordType: "halfdim", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ]
  },
  {
    chords: [
      { pitch: "D#", chordType: "-6", duration: "half" },
      { pitch: "B", chordType: "halfdim", duration: "half" }
    ]
  },
  {
    chords: [
      { pitch: "Bb", chordType: "7", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ]
  },
  { chords: [{ pitch: "D", chordType: "-6", duration: "whole" }] },
  {
    chords: [
      { pitch: "E", chordType: "halfdim", duration: "half" },
      { pitch: "A", chordType: "7", sup: "(b9)", duration: "half" }
    ],
    endSection: true
  }
];

export default bars;
