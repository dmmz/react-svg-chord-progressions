import getTimeSignature from "../src/getTimeSignature";
import BarView from "../src/bars/BarView";
import aloneTogether from "./chord-progressions/alone-together";

describe("getTimeSignature", () => {
  let barView, bars;

  beforeAll(() => {
    barView = new BarView();
    bars = aloneTogether.map((bar, i) => barView.setDimensions(bar, i));
  });

  test("should throw error if first bar has no timeSignture", () => {
    const barsWithNoTimeSig = [
      {
        section: "Intro",
        // timeSignature:"44", <- time signature would go here
        chords: [{ pitch: "E", chordType: "-6", duration: "whole" }]
      },
      { chords: [{ pitch: "E", chordType: "dim", duration: "whole" }] }
    ];

    const fn = () => {
      getTimeSignature(barsWithNoTimeSig, barView);
    };

    expect(fn).toThrow("first bar has no time signature");
  });

  test("should return two texts, with default font-size and color", () => {
    const timeSigTexts = getTimeSignature(bars, barView);
    expect(timeSigTexts).toHaveLength(2);

    timeSigTexts.map(text => {
      expect(text.fill).toBeDefined();
      expect(text.fontSize).toBeDefined();
    });
  });

  test("should work with settings", () => {
    const settings = { color: "#ODO", size: 40 };
    const timeSigTexts = getTimeSignature(bars, barView, settings);
    expect(timeSigTexts).toHaveLength(2);

    timeSigTexts.map(text => {
      expect(text.fill).toBe("#ODO");
      expect(text.fontSize).toBe(40);
    });
  });
});
