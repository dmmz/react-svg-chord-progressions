"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var endings = function endings(bars, barView) {
    var endingLines = bars.filter(function (bar) {
        return bar.ending != undefined;
    }).map(function (bar) {
        var marginX = 4;
        var x = bar.dimensions.x + marginX;
        var y = bar.dimensions.y - 15;
        return ["M" + x + " " + y + " l " + (barView.bar.width - marginX) + " 0", "M" + x + " " + y + " l 0 10"];
    });
    endingLines = [].concat.apply([], endingLines);

    var endingNumbers = bars.filter(function (bar) {
        return bar.ending != undefined;
    }).map(function (bar) {
        return {
            x: bar.dimensions.x + 4 + 4,
            y: bar.dimensions.y - 8,
            text: bar.ending.toString(),
            attr: {
                fill: '#000',
                'font-size': 10,
                'text-anchor': 'start'
            }
        };
    });
    return {
        texts: endingNumbers,
        paths: endingLines
    };
};
exports.default = endings;