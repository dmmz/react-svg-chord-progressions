const Sections = (bars, settings = {}) => {
  const DEFAULT_TEXT_COLOR = "#333";
  const DEFAULT_TEXT_SIZE = 13;

  const textColor = settings.textColor || DEFAULT_TEXT_COLOR;
  const textSize = settings.textSize || DEFAULT_TEXT_SIZE;

  const getX = bar => bar.dimensions.x + 15;
  const getY = bar => bar.dimensions.y;
  const getDefaultSettings = () => ({ textColor, textSize });

  let sectionBars = bars.filter(bar => !!bar.section);

  let hRect = 15; //rectangle's height

  let sectionTexts = [];
  let sectionRectangles = [];
  let yRect, yText, wRect;

  sectionBars.forEach(bar => {
    yRect = getY(bar) - hRect - 5;
    yText = yRect + 0.8 * hRect;
    wRect = 10 + 5 * bar.section.length; // rectangle's width

    sectionTexts.push({
      x: getX(bar) - wRect / 2,
      y: yText,
      text: bar.section,
      fill: textColor,
      fontSize: textSize
    });

    sectionRectangles.push({
      x: getX(bar) - wRect / 2,
      y: yRect,
      width: wRect,
      height: hRect,
      fill: "none",
      stroke: "black",
      strokeWidth: 1
    });
  });
  return {
    getDefaultSettings,
    getSections: () => ({
      texts: sectionTexts,
      rects: sectionRectangles
    })
  };
};
export default Sections;
