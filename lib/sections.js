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

    var hRect = 15;

    var sectionTexts = [];
    var sectionRectangles = [];
    var sectionText = void 0,
        sectionRect = void 0,
        yRect = void 0,
        yText = void 0,
        wRect = void 0;

    sectionBars.forEach(function (bar) {

        yRect = getY(bar) - hRect - 5;
        yText = yRect + 0.4 * hRect;
        wRect = 10 + 5 * bar.section.length;

        sectionTexts.push({
            x: getX(bar),
            y: yText,
            text: bar.section,
            attr: { fill: '#000', 'font-size': 13 }
        });
        sectionRectangles.push({
            x: getX(bar) - wRect / 2,
            y: yRect,
            width: wRect,
            height: hRect
        });
    });
    return {
        texts: sectionTexts,
        rects: sectionRectangles
    };
};
exports.default = sections;