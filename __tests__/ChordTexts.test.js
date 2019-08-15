import ChordTexts from "../src/chords/ChordTexts.js";

describe("ChordTexts", () => {
  const x = 0,
    y = 0;
  describe("getChordSvgElems", () => {
    let svgElems;

    test("simple chord should return texts but not lines", () => {
      //Am7
      svgElems = ChordTexts.getChordSvgElems(
        {
          pitch: "A",
          chordType: "m7"
        },
        x,
        y
      );
      expect(svgElems.texts).toHaveLength(1);
      expect(svgElems).not.toHaveProperty("lines");
    });

    test("chord with bass returns texts and 1 lines", () => {
      //Am7/G
      svgElems = ChordTexts.getChordSvgElems(
        {
          pitch: "A",
          chordType: "m7",
          bass: "/G"
        },
        x,
        y
      );
      expect(svgElems.texts).toHaveLength(2);
      expect(svgElems.lines).toHaveLength(1);
    });

    test("chord same symbol (%) should return no text, 1 lines and 2 circles", () => {
      svgElems = ChordTexts.getChordSvgElems(
        {
          same: true
        },
        x,
        y
      );
      expect(svgElems.texts).toHaveLength(0);
      expect(svgElems.lines).toHaveLength(1);
      expect(svgElems.circles).toHaveLength(2);
    });
  });
});
