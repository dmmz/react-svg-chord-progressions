class BarView {
  constructor(props = {}) {
    const DEFAULT_WIDTH = 750;
    const DEFAULT_BARS_PER_LINE = 4;
    const DEFAULT_MARGINS = {
      top: 20,
      left: 20,
      line: 30,
      right: 20,
      bottom: 20,
    };
    const DEFAULT_BAR_DIMENSIONS = {
      padding: {
        top: 25,
        left: 8,
      },
      height: 40,
      repetitionLineSpace: 4,
    };

    this.barsPerLine = props.barsPerLine || DEFAULT_BARS_PER_LINE;
    this.margins = { ...DEFAULT_MARGINS, ...props.margins };
    this.bar = { ...DEFAULT_BAR_DIMENSIONS, ...props.bar };

    const width = props.width || DEFAULT_WIDTH;
    this.bar.width =
      (width - this.margins.left - this.margins.right) / this.barsPerLine;
  }

  getDimensions(numBar) {
    if (numBar == null) {
      throw new TypeError("numBar argument must be a number");
    }
    let posBar = numBar % this.barsPerLine; // bar position
    let line = Math.floor(numBar / this.barsPerLine); // lineNumber
    let x = this.margins.left + this.bar.width * posBar;
    let y = this.margins.top + (this.bar.height + this.margins.line) * line;
    return [x, y];
  }
  setDimensions(bar, numBar) {
    const [x, y] = this.getDimensions(numBar);
    bar.dimensions = { x, y };
    return bar;
  }
  getDivisor(timeSig, duration) {
    let divisor;
    if (timeSig == "34") divisor = duration === "whole" ? 1 : 2;
    else divisor = duration === "quarter" ? 4 : duration === "half" ? 2 : 1;
    return divisor;
  }
  getStartXList(timeSig, durations) {
    if (!Array.isArray(durations)) {
      throw new TypeError("durations should be an array");
    }

    let widthList = durations.map(
      (duration) =>
        (this.bar.width - this.bar.padding.left) /
        this.getDivisor(timeSig, duration)
    );
    let currentX = this.bar.padding.left;
    let startXList = [currentX];

    // until length - 1 because don't care about last width, getting starting points
    for (let i = 0; i < widthList.length - 1; i++) {
      currentX += widthList[i];
      startXList.push(currentX);
    }
    return startXList;
  }

  getHeight(totalBars) {
    if (totalBars == null) {
      throw new TypeError("totalBars should be a number");
    }
    return (
      Math.ceil(totalBars / this.barsPerLine) *
        (this.bar.height + this.margins.line) +
      this.margins.bottom
    );
  }
}
export default BarView;
