const ChordTexts = (() => {
  const DEFAULT_SIZE_CHORD = 30;
  const DEFAULT_SIZE_SUP = 25;
  const DEFAULT_SIZE_BASS = 25;

  const scale = 0.4;
  const defaultSizeChord = DEFAULT_SIZE_CHORD * scale;
  const defaultSizeBass = DEFAULT_SIZE_BASS * scale;
  const defaultSizeSup = DEFAULT_SIZE_SUP * scale;

  const getSpecialSymbol = chordType => {
    if (chordType === "maj7") return "\u2206"; //  ∆
    if (chordType === "halfdim") return "\xF8"; //  ø

    return chordType.replace("dim", "\u2218"); // ∘
  };
  const replaceFlat = str => str.replace(/b/g, "\u266D");
  const getAttr = fontSize => ({
    fill: "#000",
    fontSize,
    fontFamily: "jazz-font,Verdana,Courier",
    textAnchor: "start"
  });
  // repeat chord sign: %
  const getRepeatSign = (x, y) => {
    const MARGIN_REPEAT_SIGN = 10;
    const STROKE_WIDTH = 3 * scale;
    const repeatSignX = x + MARGIN_REPEAT_SIGN;
    const repeatSignY = y + MARGIN_REPEAT_SIGN * scale;
    const repeatSignSize = 24 * scale;

    let circle = { r: 3 * scale, stroke: "black", fill: "black" };
    let circles = [
      { ...circle, ...{ cx: repeatSignX, cy: repeatSignY - repeatSignSize } },
      { ...circle, ...{ cx: repeatSignX + repeatSignSize, cy: repeatSignY } }
    ];

    let lines = [];
    lines.push({
      d:
        "M " +
        repeatSignX +
        " " +
        repeatSignY +
        " l " +
        repeatSignSize +
        " " +
        -1 * repeatSignSize,
      strokeWidth: STROKE_WIDTH,
      stroke: "black"
    });
    return { lines, texts: [], circles };
  };
  const getChordSvgElems = (chord, x, y) => {
    if (chord.same) return getRepeatSign(x, y);
    y += 5; //due to font, we have to put them 5 points higher
    let lines = [];
    let chordText =
      replaceFlat(chord.pitch) + getSpecialSymbol(chord.chordType);
    let texts = [
      {
        x,
        y,
        text: chordText,
        ...getAttr(defaultSizeChord)
      }
    ];
    if (chord.sup) {
      texts.push({
        x: x + scale * (chordText.length * 10 + 5),
        y: y - scale * (defaultSizeChord / 3),
        text: replaceFlat(chord.sup.substr(1, chord.sup.length - 2)), //removing parenthesis
        ...getAttr(defaultSizeSup)
      });
    }
    if (chord.bass) {
      let bassX = x + scale * (chordText.length * 10);
      let bassY = y + scale * 25;
      texts.push({
        x: bassX,
        y: bassY,
        text: replaceFlat(chord.bass.substr(1, chord.bass.length)),
        ...getAttr(defaultSizeBass)
      });
      lines.push({
        d:
          "M" +
          (bassX - scale * 10) +
          " " +
          (y + scale * 10) +
          " l " +
          scale * 24 +
          " " +
          scale * -15,
        strokeWidth: 3 * scale,
        stroke: "black"
      });
    }
    let returnObj = { texts };
    if (lines.length) returnObj.lines = lines;
    return returnObj;
  };

  const getSvgElems = (bars, barView) => {
    const timeSignature = bars[0].timeSignature || "44";
    let barChordsText = bars.map(bar => {
      //we get startXList
      let startXList = barView.getStartXList(
        timeSignature,
        bar.chords.map(chord => chord.duration)
      );

      let barChords = bar.chords.map((chord, i) => {
        chord.startX = startXList[i];
        return chord;
      });

      let chordTexts = barChords.map(chord => {
        let x = bar.dimensions.x + chord.startX;
        let y = bar.dimensions.y + barView.bar.padding.top;
        return getChordSvgElems(chord, x, y);
      });
      let lines = chordTexts
        .filter(chord => !!chord.lines)
        .map(chord => chord.lines);
      lines = [].concat.apply([], lines);

      let circles = chordTexts
        .filter(chord => !!chord.circles)
        .map(chord => chord.circles);
      circles = [].concat.apply([], circles);

      chordTexts = [].concat.apply([], chordTexts.map(chord => chord.texts));
      return { startXList, chordTexts, lines, circles };
    });

    let barCircles = [].concat.apply(
      [],
      barChordsText.filter(bar => !!bar.circles).map(bar => bar.circles)
    );
    let barLines = [].concat.apply(
      [],
      barChordsText.filter(bar => !!bar.lines).map(bar => bar.lines)
    );
    let startXList = barChordsText.map(bar => bar.startXList);
    barChordsText = [].concat.apply(
      [],
      barChordsText.map(bar => bar.chordTexts)
    );

    let returnObj = {
      texts: barChordsText,
      startX: startXList
    };

    if (barLines) returnObj.paths = barLines;
    if (barCircles) returnObj.circles = barCircles;

    return returnObj;
  };
  return {
    getChordSvgElems,
    getSvgElems
  };
})();

export default ChordTexts;
