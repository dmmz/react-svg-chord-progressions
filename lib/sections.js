'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getX = function getX(bar) {
    return bar.dimensions.x + 15;
};
var getY = function getY(bar) {
    return bar.dimensions.y;
};

var sections = function sections(bars) {
    var sectionBars = bars.filter(function (bar) {
        return bar.section;
    });
    var sectionText = sectionBars.map(function (bar, i) {
        return {
            x: getX(bar),
            y: getY(bar),
            text: bar.section,
            attr: { fill: '#000', 'font-size': 15 }
        };
    });
    var width = 20;
    var height = 20;
    var sectionRectangles = sectionBars.map(function (bar, i) {
        return {
            x: getX(bar) - width / 2,
            y: getY(bar) - height / 2,
            width: width,
            height: height
        };
    });
    return {
        texts: sectionText,
        rects: sectionRectangles
    };
};
exports.default = sections;