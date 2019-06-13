'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ChordTexts = function () {
    var DEFAULT_SIZE_CHORD = 35;
    var DEFAULT_SIZE_SUP = 25;
    var DEFAULT_SIZE_BASS = 25;

    var getSpecialSymbol = function getSpecialSymbol(chordType) {
        if (chordType === 'maj7') return '\u2206'; //  ∆
        if (chordType === 'halfdim') return "\xF8"; //  ø

        return chordType.replace('dim', '\u2218'); // ∘
    };
    var replaceFlat = function replaceFlat(str) {
        return str.replace(/b/g, '\u266D');
    };
    var getAttr = function getAttr(fontSize) {
        return {
            fill: '#000',
            fontSize: fontSize,
            fontFamily: 'jazz-font,Verdana,Courier',
            textAnchor: 'start'
        };
    };
    // repeat chord sign: %
    var getRepeatSign = function getRepeatSign(x, y) {
        var MARGIN_REPEAT_SIGN = 10;
        var STROKE_WIDTH = 3;
        var sizeRepeatSign = DEFAULT_SIZE_CHORD * 2 / 3;
        var repeatSignX = x + MARGIN_REPEAT_SIGN;

        var circle = { r: 3, stroke: 'black', fill: 'black' };
        var circles = [_extends({}, circle, { cx: x + 12, cy: y - 10 }), _extends({}, circle, { cx: x + 31, cy: y + 6 })];

        var lines = [];
        lines.push({
            d: "M" + repeatSignX + " " + (y + MARGIN_REPEAT_SIGN) + " l " + sizeRepeatSign + " " + (-DEFAULT_SIZE_CHORD + MARGIN_REPEAT_SIGN),
            strokeWidth: STROKE_WIDTH,
            stroke: 'black'
        });
        return { lines: lines, texts: [], circles: circles };
    };
    var getChordSvgElems = function getChordSvgElems(chord, x, y) {

        if (chord.same) return getRepeatSign(x, y);
        y += 5; //due to font, we have to put them 5 points higher
        var lines = [];
        var chordText = replaceFlat(chord.pitch) + getSpecialSymbol(chord.chordType);
        var texts = [_extends({
            x: x,
            y: y,
            text: chordText
        }, getAttr(DEFAULT_SIZE_CHORD))];
        if (chord.sup) {
            texts.push(_extends({
                x: x + chordText.length * 14,
                y: y - DEFAULT_SIZE_CHORD / 3,
                text: replaceFlat(chord.sup.substr(1, chord.sup.length - 2)) }, getAttr(DEFAULT_SIZE_SUP)));
        }
        if (chord.bass) {
            var bassX = x + chordText.length * 10;
            var bassY = y + 20;
            texts.push(_extends({
                x: bassX,
                y: bassY,
                text: replaceFlat(chord.bass.substr(1, chord.bass.length))
            }, getAttr(DEFAULT_SIZE_BASS)));
            lines.push({
                d: "M" + (bassX - 10) + " " + (y + 10) + " l 24 -15",
                strokeWidth: 3,
                stroke: 'black'
            });
        }
        var returnObj = { texts: texts };
        if (lines.length) returnObj.lines = lines;
        return returnObj;
    };

    var getSvgElems = function getSvgElems(bars, barView) {

        var timeSignature = bars[0].timeSignature || "44";
        var barChordsText = bars.map(function (bar) {
            //we get startXList
            var startXList = barView.getStartXList(timeSignature, bar.chords.map(function (chord) {
                return chord.duration;
            }));

            //we add it as property to each chord
            var barChords = bar.chords.map(function (chord, i) {
                chord.startX = startXList[i];
                return chord;
            });

            var chordTexts = barChords.map(function (chord) {
                var x = bar.dimensions.x + chord.startX;
                var y = bar.dimensions.y + barView.bar.padding.top;
                return getChordSvgElems(chord, x, y);
            });
            var lines = chordTexts.filter(function (chord) {
                return !!chord.lines;
            }).map(function (chord) {
                return chord.lines;
            });
            lines = [].concat.apply([], lines);

            var circles = chordTexts.filter(function (chord) {
                return !!chord.circles;
            }).map(function (chord) {
                return chord.circles;
            });
            circles = [].concat.apply([], circles);

            chordTexts = [].concat.apply([], chordTexts.map(function (chord) {
                return chord.texts;
            }));
            return { startXList: startXList, chordTexts: chordTexts, lines: lines, circles: circles };
        });

        var barCircles = [].concat.apply([], barChordsText.filter(function (bar) {
            return !!bar.circles;
        }).map(function (bar) {
            return bar.circles;
        }));
        var barLines = [].concat.apply([], barChordsText.filter(function (bar) {
            return !!bar.lines;
        }).map(function (bar) {
            return bar.lines;
        }));
        var startXList = barChordsText.map(function (bar) {
            return bar.startXList;
        });
        barChordsText = [].concat.apply([], barChordsText.map(function (bar) {
            return bar.chordTexts;
        }));

        var returnObj = {
            texts: barChordsText,
            startX: startXList
        };

        if (barLines) returnObj.paths = barLines;
        if (barCircles) returnObj.circles = barCircles;

        return returnObj;
    };
    return {
        getChordSvgElems: getChordSvgElems,
        getSvgElems: getSvgElems
    };
}();

exports.default = ChordTexts;