'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Selections = function () {

    var getLineChange = function getLineChange(bars, barView, i) {
        var isNotLast = function isNotLast(arr, pos) {
            return pos < arr.length - 1;
        };

        while (isNotLast(bars, i) && bars[i].dimensions.y === bars[i + 1].dimensions.y) {
            i++;
        }var dims = [{
            x: bars[i].dimensions.x + barView.bar.width,
            y: bars[i].dimensions.y
        }];

        if (isNotLast(bars, i)) dims.push({
            x: bars[i + 1].dimensions.x,
            y: bars[i + 1].dimensions.y
        });

        return { i: i, dims: dims };
    };

    var getRectsDims = function getRectsDims(bars, barView, startX, selection) {
        var rectsDims = [];
        //start x,y
        var startBar = bars[selection.start.bar].dimensions;
        var startChordX = startX[selection.start.bar][selection.start.chord];
        var x = startBar.x + startChordX;
        var y = startBar.y;
        //end x,y
        var endBar = bars[selection.end.bar].dimensions;
        var endY = endBar.y;
        var endBarChordsX = startX[selection.end.bar];
        var endX = selection.end.chord === endBarChordsX.length - 1 ? endBar.x + barView.bar.width : endBar.x + endBarChordsX[selection.end.chord + 1];

        if (y === endY) rectsDims.push({ x: x, y: y, endX: endX, endY: endY });else {
            var prevDims = void 0,
                i = void 0,
                dims = void 0;
            var isFirst = true,
                lineChanges = [];

            var tmpY = y;
            var iBar = selection.start.bar;
            while (tmpY !== endY) {
                ;
                var _getLineChange = getLineChange(bars, barView, iBar);

                i = _getLineChange.i;
                dims = _getLineChange.dims;

                iBar = i + 1;
                tmpY = dims[1].y;

                if (isFirst) {
                    isFirst = false;
                    rectsDims.push({ x: x, y: y, endX: dims[0].x, endY: dims[0].y });
                } else {
                    rectsDims.push({ x: prevDims.x, y: prevDims.y, endX: dims[0].x, endY: dims[0].y });
                }
                prevDims = dims[1];
            }
            rectsDims.push({ x: prevDims.x, y: prevDims.y, endX: endX, endY: endY });
        }
        return rectsDims;
    };
    var getRects = function getRects(bars, barView, startX, selections) {
        var totalRectsDims = [],
            rectsDims = void 0;

        var _loop = function _loop(selection) {
            rectsDims = getRectsDims(bars, barView, startX, selection).map(function (dims, i) {
                var color = selection.color || '#00F';
                return {
                    x: dims.x,
                    y: dims.y,
                    width: dims.endX - dims.x,
                    height: barView.bar.height,
                    attr: { fill: color, 'fill-opacity': 0.3, stroke: color, 'stroke-opacity': 1 }
                };
            });
            totalRectsDims = [].concat(_toConsumableArray(totalRectsDims), _toConsumableArray(rectsDims));
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = selections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var selection = _step.value;

                _loop(selection);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return totalRectsDims;
    };

    return { getRects: getRects, getRectsDims: getRectsDims, getLineChange: getLineChange };
}();

exports.default = Selections;