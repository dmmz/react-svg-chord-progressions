'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var chordTexts = function chordTexts(bars, barView) {
    var fontSizeChord = 35;
    var fontSizeSup = 25;
    var fontSizeBass = 28;

    var getSpecialSymbol = function getSpecialSymbol(chordType) {
        if (chordType === 'maj7') return '\u2206';
        if (chordType === 'halfdim') return "\xF8";

        return chordType.replace('dim', '\u25CB');
    };
    var getAttr = function getAttr(fontSize) {
        return {
            fill: '#000',
            'font-size': fontSize,
            'font-family': 'jazz-font,Verdana,Courier',
            'text-anchor': 'start'
        };
    };
    var barChordsText = bars.map(function (bar) {
        //we get startXList
        var startXList = barView.getStartXList(bar.chords.map(function (chord) {
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
            var chordText = chord.same ? '%' : chord.pitch.replace(/b/g, '\u266D') + getSpecialSymbol(chord.chordType);
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
                    text: chord.sup.substr(1, chord.sup.length - 2).replace(/b/g, '\u266D'), //removing parenthesis
                    attr: getAttr(fontSizeSup)
                });
            }
            var bassLines = [];
            if (chord.bass) {
                var bassX = x + chordText.length * 10;
                var bassY = y + 22;
                texts.push({
                    x: bassX,
                    y: bassY,
                    text: chord.bass.substr(1, chord.bass.length),
                    attr: getAttr(fontSizeBass)
                });
                bassLines.push({
                    d: "M" + (bassX - 8) + " " + (bassY - 7) + " l 24 -10",
                    "stroke-width": 3
                });
            }
            var returnObj = { texts: texts };
            if (bassLines.length) returnObj.bassLines = bassLines;
            return returnObj;
        });
        var bassLines = chordTexts.filter(function (chord) {
            return !!chord.bassLines;
        }).map(function (chord) {
            return chord.bassLines;
        });
        bassLines = [].concat.apply([], bassLines);
        chordTexts = [].concat.apply([], chordTexts.map(function (chord) {
            return chord.texts;
        }));
        return { chordTexts: chordTexts, bassLines: bassLines };
    });
    var barBassLines = [].concat.apply([], barChordsText.map(function (bar) {
        return bar.bassLines;
    }));
    barChordsText = [].concat.apply([], barChordsText.map(function (bar) {
        return bar.chordTexts;
    }));
    return {
        texts: barChordsText,
        paths: barBassLines
    };
};
exports.default = chordTexts;