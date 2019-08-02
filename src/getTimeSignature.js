const getTimeSignature = (bars, barView, settings = {}) => {
  if (!bars[0].timeSignature) {
    throw new TypeError("first bar has no time signature");
  }

  const DEFAULT_SIZE = 20;
  const DEFAULT_COLOR = "#000";
  const color = settings.color || DEFAULT_COLOR;
  const size = settings.size || DEFAULT_SIZE;

  let timeSig = bars[0].timeSignature;
  let attrTimeSig = {
    fill: color,
    fontSize: size,
    textAnchor: "start"
  };
  let timeSigX = bars[0].dimensions.x - 15;
  let baseY = bars[0].dimensions.y + barView.bar.height / 2 + 5;
  let distance = 10;

  return [
    {
      x: timeSigX,
      y: baseY - distance,
      text: timeSig[0].toString(),
      ...attrTimeSig
    },
    {
      x: timeSigX,
      y: baseY + distance,
      text: timeSig[1].toString(),
      ...attrTimeSig
    }
  ];
};
export default getTimeSignature;
