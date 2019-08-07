const ChordTexts = (() => {
  const scale = 0.7;
  const defaultSizeChord = 30 * scale;
  const defaultSizeBass = 25 * scale;
  const defaultSizeSup = 25 * scale;
  const strokeWidth = 3 * scale;

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
    const repeatSignX = x + MARGIN_REPEAT_SIGN;
    const repeatSignY = y + MARGIN_REPEAT_SIGN * scale;
    const repeatSignSize = 20 * scale;

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
      strokeWidth,
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
        text: replaceFlat(chord.sup.substr(1, chord.sup.length - 2)),
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
        strokeWidth,
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
        .flatMap(chord => chord.lines);

      let circles = chordTexts
        .filter(chord => !!chord.circles)
        .flatMap(chord => chord.circles);

      chordTexts = chordTexts.flatMap(chord => chord.texts);
      return { startXList, chordTexts, lines, circles };
    });

    let barCircles = barChordsText
      .filter(bar => !!bar.circles)
      .flatMap(bar => bar.circles);

    let barLines = barChordsText
      .filter(bar => !!bar.lines)
      .flatMap(bar => bar.lines);

    let startXList = barChordsText.map(bar => bar.startXList);
    barChordsText = barChordsText.flatMap(bar => bar.chordTexts);

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
