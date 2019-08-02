import "core-js/fn/array/flat-map";

/** get diagonal repeat lines: looks something like
 *   /             \
    |.             .|
    |.  A m  Gm7   .|
     \             /
*/
const getRepeatLines = (dims, type) => {
  //x and y determine the diagonal line's length
  const y = 5;
  const x = 7;

  const drawX = type === "backward" ? -x : x;
  const moveX = type === "backward" ? dims.xEnd : dims.x;
  return [
    "M" + moveX + " " + dims.y + " l " + drawX + " " + -y,
    "M" + moveX + " " + dims.yEnd + " l " + drawX + " " + y
  ];
};

/* get the points in the repetition
 *  |:  A m7   |  Gm7  :|
 * */
const getRepetitionCircles = (bars, barView) => {
  const yDistance = 4; // from y center of bar to point (either point above or below)
  const xDistance = 4; // distance from bar to points

  const getY = (y, type) => {
    let fDist = type === "up" ? -yDistance : yDistance;
    return y + barView.bar.height / 2 + fDist;
  };
  const circle = {
    r: 1,
    stroke: "black"
  };
  const getCircles = (bar, barView) => {
    let x =
      bar.repeat === "forward"
        ? bar.dimensions.x + xDistance
        : bar.dimensions.x + barView.bar.width - xDistance;

    let y1 = getY(bar.dimensions.y, "up");
    let y2 = getY(bar.dimensions.y, "down");

    let circle1 = { ...circle, ...{ cx: x, cy: y1 } };
    let circle2 = { ...circle, ...{ cx: x, cy: y2 } };
    return [circle1, circle2];
  };

  return bars
    .filter(bar => !!bar.repeat)
    .flatMap(bar => {
      return getCircles(bar, barView);
    });
};
const getBarLines = (bars, barView) => {
  if (
    !barView.bar ||
    barView.bar.width === undefined ||
    barView.bar.height === undefined ||
    barView.bar.repetitionLineSpace === undefined
  )
    throw new TypeError(
      "barView arguments needed: bar.width, bar.height and bar.repetitionLineSpace"
    );

  let barLines = bars.flatMap(bar => {
    let dims = {
      x: bar.dimensions.x,
      y: bar.dimensions.y,
      xEnd: bar.dimensions.x + barView.bar.width,
      yEnd: bar.dimensions.y + barView.bar.height
    };
    let line = ["M" + dims.xEnd + " " + dims.y + " l 0 " + barView.bar.height];

    if (bar.endSection)
      line.push(
        "m" +
          (dims.xEnd - barView.bar.repetitionLineSpace) +
          " " +
          dims.y +
          " l 0 " +
          barView.bar.height
      );

    if (bar.repeat) {
      if (bar.repeat === "forward") {
        line.push("m" + dims.x + " " + dims.y + " l 0 " + barView.bar.height);
      }
      line = line.concat(getRepeatLines(dims, bar.repeat));
    }
    return line;
  });

  return {
    paths: barLines,
    circles: getRepetitionCircles(bars, barView)
  };
};
export default getBarLines;
