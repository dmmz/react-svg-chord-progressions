import getBarLines from "../src/getBarLines";
import BarView from "../src/BarView";
import aloneTogether from "./chord-progressions/alone-together";

describe("getBarLines", () => {
  const barView = new BarView();
  const bars = aloneTogether.map((bar, i) => barView.setDimensions(bar, i));
  const { paths, circles } = getBarLines(bars, barView);

  test("should return twice as circles as repeat bars", () => {
    expect(circles).toHaveLength(bars.filter(bar => !!bar.repeat).length * 2);
  });

  test("should return several paths", () => {
    expect(paths).not.toHaveLength(0);
  });
});
