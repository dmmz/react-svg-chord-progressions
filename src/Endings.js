import "core-js/fn/array/flat-map";

const Endings = (bars, barView, settings = {}) => {
  if (!bars || !bars.length) {
    throw new TypeError("bars must be a non-empty array");
  }
  if (!barView) {
    throw new TypeError("barView argument required");
  }
  const DEFAULT_NUMBER_SIZE = 10;
  const MARGIN_X = 4;
  const MARGIN_Y = 15;
  const NUMBER_MARGIN_X = 8;
  const DEFAULT_NUMBER_COLOR = "#000";

  const numberSize = settings.numberSize || DEFAULT_NUMBER_SIZE;
  const numberColor = settings.numberColor || DEFAULT_NUMBER_COLOR;

  const numberMarginY = MARGIN_Y - numberSize;

  const getDefaultSettings = () => ({ numberSize, numberColor });

  let endingLines = bars
    .filter(bar => bar.ending != undefined)
    .flatMap(bar => {
      const x = bar.dimensions.x + MARGIN_X;
      const y = bar.dimensions.y - MARGIN_Y;
      return [
        "M" + x + " " + y + " l " + (barView.bar.width - MARGIN_X) + " 0",
        "M" + x + " " + y + " l 0 10"
      ];
    });

  let endingNumbers = bars
    .filter(bar => bar.ending != undefined)
    .map(bar => ({
      x: bar.dimensions.x + NUMBER_MARGIN_X,
      y: bar.dimensions.y - numberMarginY,
      text: bar.ending.toString(),
      fill: numberColor,
      fontSize: numberSize,
      textAnchor: "start"
    }));
  return {
    getDefaultSettings,
    getEndings: () => ({
      texts: endingNumbers,
      paths: endingLines
    })
  };
};
export default Endings;
