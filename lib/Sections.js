'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Sections = function Sections(bars) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var DEFAULT_TEXT_COLOR = '#333';
    var DEFAULT_TEXT_SIZE = 13;

    var textColor = settings.textColor || DEFAULT_TEXT_COLOR;
    var textSize = settings.textSize || DEFAULT_TEXT_SIZE;

    var getX = function getX(bar) {
        return bar.dimensions.x + 15;
    };
    var getY = function getY(bar) {
        return bar.dimensions.y;
    };
    var getDefaultSettings = function getDefaultSettings() {
        return { textColor: textColor, textSize: textSize };
    };

    var sectionBars = bars.filter(function (bar) {
        return !!bar.section;
    });

    var hRect = 15; //rectangle's height

    var sectionTexts = [];
    var sectionRectangles = [];
    var yRect = void 0,
        yText = void 0,
        wRect = void 0;

    sectionBars.forEach(function (bar) {

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
            fill: 'none',
            stroke: 'black',
            strokeWidth: 1
        });
    });
    return {
        getDefaultSettings: getDefaultSettings,
        getSections: function getSections() {
            return {
                texts: sectionTexts,
                rects: sectionRectangles
            };
        }
    };
};
exports.default = Sections;