'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Endings = function Endings(bars, barView) {
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!bars || !bars.length) {
        throw new TypeError('bars must be a non-empty array');
    }
    if (!barView) {
        throw new TypeError('barView argument required');
    }
    var DEFAULT_NUMBER_SIZE = 10;
    var MARGIN_X = 4;
    var MARGIN_Y = 15;
    var NUMBER_MARGIN_X = 8;
    var DEFAULT_NUMBER_COLOR = '#000';

    var numberSize = settings.numberSize || DEFAULT_NUMBER_SIZE;
    var numberColor = settings.numberColor || DEFAULT_NUMBER_COLOR;

    var numberMarginY = MARGIN_Y - numberSize;

    var getDefaultSettings = function getDefaultSettings() {
        return { numberSize: numberSize, numberColor: numberColor };
    };

    var endingLines = bars.filter(function (bar) {
        return bar.ending != undefined;
    }).map(function (bar) {
        var x = bar.dimensions.x + MARGIN_X;
        var y = bar.dimensions.y - MARGIN_Y;
        return ["M" + x + " " + y + " l " + (barView.bar.width - MARGIN_X) + " 0", "M" + x + " " + y + " l 0 10"];
    });
    endingLines = [].concat.apply([], endingLines);

    var endingNumbers = bars.filter(function (bar) {
        return bar.ending != undefined;
    }).map(function (bar) {
        return {
            x: bar.dimensions.x + NUMBER_MARGIN_X,
            y: bar.dimensions.y - numberMarginY,
            text: bar.ending.toString(),
            fill: numberColor,
            fontSize: numberSize,
            textAnchor: 'start'
        };
    });
    return {
        getDefaultSettings: getDefaultSettings,
        getEndings: function getEndings() {
            return {
                texts: endingNumbers,
                paths: endingLines
            };
        }
    };
};
exports.default = Endings;