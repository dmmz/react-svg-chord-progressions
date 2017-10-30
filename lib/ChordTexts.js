'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ChordTexts = function () {
    var fontSizeChord = 35;
    var fontSizeSup = 25;
    var fontSizeBass = 28;

    var getSpecialSymbol = function getSpecialSymbol(chordType) {
        if (chordType === 'maj7') return '\u2206';
        if (chordType === 'halfdim') return "\xF8";

        return chordType.replace('dim', '\u2218');
    };
    var replaceFlat = function replaceFlat(str) {
        return str.replace(/b/g, '\u266D');
    };
    var getAttr = function getAttr(fontSize) {
        return {
            fill: '#000',
            'font-size': fontSize,
            'font-family': 'jazz-font,Verdana,Courier',
            'text-anchor': 'start'
        };
    };
    // repeat chord sign: %
    var getRepeatSign = function getRepeatSign(x, y) {
        var sizeRepeatSign = fontSizeChord * 2 / 3;
        var marginRepeatSign = 10;
        var repeatSignX = x + marginRepeatSign;

        var circle = { r: 3, attr: { stroke: 'black', fill: 'black' } };
        var circles = [Object.assign({}, { x: x + 12, y: y - 10 }, circle), Object.assign({}, { x: x + 31, y: y + 6 }, circle)];

        var lines = [];
        lines.push({
            d: "M" + repeatSignX + " " + (y + marginRepeatSign) + " l " + sizeRepeatSign + " " + (-fontSizeChord + marginRepeatSign),
            "stroke-width": 3
        });
        return { lines: lines, texts: [], circles: circles };
    };
    var getChordSvgElems = function getChordSvgElems(chord, x, y) {

        if (chord.same) return getRepeatSign(x, y);
        y = y - 5; //due to new font, we have to put them 5 points higher 
        var lines = [];
        var chordText = replaceFlat(chord.pitch) + getSpecialSymbol(chord.chordType);
        var texts = [{
            x: x,
            y: y,
            text: chordText,
            attr: getAttr(fontSizeChord)
        }];
        if (chord.sup) {
            texts.push({
                x: x + chordText.length * 14,
                y: y - fontSizeChord / 3,
                text: replaceFlat(chord.sup.substr(1, chord.sup.length - 2)), //removing parenthesis
                attr: getAttr(fontSizeSup)
            });
        }
        if (chord.bass) {
            var bassX = x + chordText.length * 10;
            var bassY = y + 22;
            texts.push({
                x: bassX,
                y: bassY,
                text: replaceFlat(chord.bass.substr(1, chord.bass.length)),
                attr: getAttr(fontSizeBass)
            });
            lines.push({
                d: "M" + (bassX - 8) + " " + (bassY - 3) + " l 24 -10",
                "stroke-width": 3
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
            return { chordTexts: chordTexts, lines: lines, circles: circles };
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
        barChordsText = [].concat.apply([], barChordsText.map(function (bar) {
            return bar.chordTexts;
        }));
        var returnObj = {
            texts: barChordsText
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