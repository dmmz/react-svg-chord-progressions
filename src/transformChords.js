const replaceFlat = str => str.replace(/b/g, "\u266D");
const getSpecialSymbol = chordType => {
  if (chordType === "maj7") return "\u2206"; //  ∆
  if (chordType === "halfdim") return "\xF8"; //  ø

  return chordType.replace("dim", "\u2218"); // ∘
};
export default bar => {
  const chords = bar.chords.map(chord => {
    return !chord.pitch
      ? chord
      : {
          ...chord,
          pitch: replaceFlat(chord.pitch),
          chordType: getSpecialSymbol(chord.chordType),
          sup: chord.sup
            ? replaceFlat(chord.sup.substr(1, chord.sup.length - 2))
            : null,
          bass: chord.bass
            ? replaceFlat(chord.bass.substr(1, chord.bass.length))
            : null
        };
  });
  return {
    ...bar,
    chords
  };
};
