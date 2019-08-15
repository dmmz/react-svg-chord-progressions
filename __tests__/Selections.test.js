import Selections from "../src/Selections.js";

const generateBars = (width, height, numColumns, numRows) => {
  let bars = [...Array(numColumns)].map((item, i) =>
    [...Array(numRows)].map((item, j) => ({
      dimensions: {
        x: j * width,
        y: i * height
      }
    }))
  );
  return [].concat.apply([], bars);
};

describe("Selections", () => {
  let barView,
    bars = [1, 2, 3, 4];
  const BAR_WIDTH = 50;
  const BAR_HEIGHT = 100;

  beforeAll(() => {
    barView = {
      bar: {
        width: BAR_WIDTH,
        height: BAR_HEIGHT
      }
    };
    bars = generateBars(BAR_WIDTH, BAR_HEIGHT, 4, 4);
  });

  describe("getLineChange", () => {
    let firstLineChange;

    beforeAll(() => {
      const pos1 = {
        x: bars[3].dimensions.x + BAR_WIDTH,
        y: bars[3].dimensions.y
      };
      const pos2 = { x: bars[4].dimensions.x, y: bars[4].dimensions.y };
      firstLineChange = [pos1, pos2];
    });

    test("get line change", () => {
      let { dims } = Selections.getLineChange(bars, barView, 1);
      expect(dims).toEqual(firstLineChange);
    });

    test("get line change from a random position in same line", () => {
      let { dims } = Selections.getLineChange(bars, barView, 2);
      expect(dims).toEqual(firstLineChange);
    });
    //this case in practice should never arrive, because line changes will be always between start and end bar
    //there can never be an end bar after last bar
    //we include it to prevent bugs in the call of getLineChange
    test("case of last bar", () => {
      let { dims } = Selections.getLineChange(bars, barView, 13);
      const lastBarPos = bars.length - 1;
      expect(dims).toEqual([
        {
          x: bars[lastBarPos].dimensions.x + BAR_WIDTH,
          y: bars[lastBarPos].dimensions.y
        }
      ]);
    });
  });

  describe("getRectsDims", () => {
    let startX;
    beforeAll(() => {
      //e.g:  Am    | Dm | G7    | C Am |
      //      F Gm  | D  | Bb Eb | F G  |
      //      Dm    | G7 | Dm    | G7   |
      //      Am    | E7 | Am    | G7   |

      startX = [
        [2],
        [2],
        [2],
        [2, 27],
        [2, 27],
        [2],
        [2, 27],
        [2, 27][2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2]
      ];
    });

    test("selections finishing in middle of bar", () => {
      //e.g. Am  |[ Dm | G7 | C ] Am |...
      const selection = {
        start: { bar: 1, chord: 0 },
        end: { bar: 3, chord: 0 },
        color: "#F00"
      };
      const selectionPos = [
        {
          x: bars[1].dimensions.x + startX[1][0],
          y: bars[1].dimensions.y,
          endX: bars[3].dimensions.x + startX[3][1],
          endY: bars[3].dimensions.y
        }
      ];
      expect(Selections.getRectsDims(bars, barView, startX, selection)).toEqual(
        selectionPos
      );
    });

    test("selections finishing in end of bar", () => {
      //e.g. Am  |[ Dm | G7 | C ] Am |...
      const selection = {
        start: { bar: 1, chord: 0 },
        end: { bar: 3, chord: 1 },
        color: "#F00"
      };
      const selectionPos = [
        {
          x: bars[1].dimensions.x + startX[1][0],
          y: bars[1].dimensions.y,
          endX: bars[3].dimensions.x + BAR_WIDTH,
          endY: bars[3].dimensions.y
        }
      ];
      expect(Selections.getRectsDims(bars, barView, startX, selection)).toEqual(
        selectionPos
      );
    });

    test("selections including two bar lines", () => {
      const selection = {
        start: { bar: 3, chord: 0 },
        end: { bar: 4, chord: 1 },
        color: "#F00"
      };
      const firstLineSelection = {
        x: bars[3].dimensions.x + startX[3][0],
        y: bars[3].dimensions.y,
        endX: bars[3].dimensions.x + BAR_WIDTH,
        endY: bars[3].dimensions.y
      };
      const secondLineSelection = {
        x: bars[4].dimensions.x,
        y: bars[4].dimensions.y,
        endX: bars[4].dimensions.x + BAR_WIDTH,
        endY: bars[4].dimensions.y
      };
      expect(Selections.getRectsDims(bars, barView, startX, selection)).toEqual(
        [firstLineSelection, secondLineSelection]
      );
    });

    test("selections including three bar lines", () => {
      const selection = {
        start: { bar: 1, chord: 0 },
        end: { bar: 10, chord: 0 },
        color: "#F00"
      };

      const firstLineSelection = {
        x: bars[1].dimensions.x + startX[1][0],
        y: bars[1].dimensions.y,
        endX: bars[3].dimensions.x + BAR_WIDTH,
        endY: bars[3].dimensions.y
      };

      const secondLineSelection = {
        x: bars[4].dimensions.x,
        y: bars[4].dimensions.y,
        endX: bars[7].dimensions.x + BAR_WIDTH,
        endY: bars[7].dimensions.y
      };

      const thirdLineSelection = {
        x: bars[8].dimensions.x,
        y: bars[8].dimensions.y,
        endX: bars[10].dimensions.x + BAR_WIDTH,
        endY: bars[10].dimensions.y
      };

      expect(Selections.getRectsDims(bars, barView, startX, selection)).toEqual(
        [firstLineSelection, secondLineSelection, thirdLineSelection]
      );
    });
  });
});
