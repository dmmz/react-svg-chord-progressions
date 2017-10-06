'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** get diagonal repeat lines: looks something like
 *   /             \
    |.             .|
    |.  A m  Gm7   .|
     \             /
*/
var getRepeatLines = function getRepeatLines(dims, type) {
    //x and y determine the diagonal line's length 
    var y = 5;
    var x = 7;

    var drawX = type === 'backward' ? -x : x;
    var moveX = type === 'backward' ? dims.xEnd : dims.x;
    return ["M" + moveX + " " + dims.y + " l " + drawX + " " + -y, "M" + moveX + " " + dims.yEnd + " l " + drawX + " " + y];
};

/* get the points in the repetition
 *  |:  A m7   |  Gm7  :|
 * */
var getRepetitionCircles = function getRepetitionCircles(bars, barView) {

    var yDistance = 4; // from y center of bar to point (either point above or below)
    var xDistance = 4; // distance from bar to points

    var getY = function getY(y, type) {
        var fDist = type === 'up' ? -yDistance : yDistance;
        return y + barView.bar.height / 2 + fDist;
    };
    var getCircles = function getCircles(bar, barView) {
        var circle = {
            r: 1,
            attr: {
                stroke: 'black'
            }
        };
        var x = bar.repeat === 'forward' ? bar.dimensions.x + xDistance : bar.dimensions.x + barView.bar.width - xDistance;

        var y1 = getY(bar.dimensions.y, 'up');
        var y2 = getY(bar.dimensions.y, 'down');

        var circle1 = Object.assign({}, circle, { x: x, y: y1 });
        var circle2 = Object.assign({}, circle, { x: x, y: y2 });
        return [circle1, circle2];
    };

    var repetitionCircles = bars.filter(function (bar) {
        return !!bar.repeat;
    }).map(function (bar) {
        return getCircles(bar, barView);
    });
    return [].concat.apply([], repetitionCircles);
};
var getBarLines = function getBarLines(bars, barView) {
    if (!barView.bar || barView.bar.width === undefined || barView.bar.height === undefined || barView.bar.repetitionLineSpace === undefined) throw "getBarLines: some parameters missing";

    var barLines = bars.map(function (bar) {
        var dims = {
            x: bar.dimensions.x,
            y: bar.dimensions.y,
            xEnd: bar.dimensions.x + barView.bar.width,
            yEnd: bar.dimensions.y + barView.bar.height
        };
        var line = ["M" + dims.xEnd + " " + dims.y + " l 0 " + barView.bar.height];

        if (bar.endSection) line.push("m" + (dims.xEnd - barView.bar.repetitionLineSpace) + " " + dims.y + " l 0 " + barView.bar.height);

        if (bar.repeat) {
            if (bar.repeat === 'forward') {
                line.push("m" + dims.x + " " + dims.y + " l 0 " + barView.bar.height);
            }
            line = line.concat(getRepeatLines(dims, bar.repeat));
        }
        return line;
    });
    barLines = [].concat.apply([], barLines);
    return {
        paths: barLines,
        circles: getRepetitionCircles(bars, barView)
    };
};
exports.default = getBarLines;