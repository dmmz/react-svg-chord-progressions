export const transformChords = bar => {
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

const replaceFlat = str => str.replace(/b/g, "\u266D");

const getSpecialSymbol = chordType => {
  if (chordType === "maj7") return "\u2206"; //  ∆
  if (chordType === "halfdim") return "\xF8"; //  ø

  return chordType.replace("dim", "\u2218"); // ∘
};

export const getChordTextScale = (bars, barWidth) => {
  /*
  F maj7
  Db maj7
  B halfdim
  F# halfdim
  F 7(sus4,9)
  Eb 7(sus4,9)
  Db major-13th
  Ab 7(#11,9,13)
  Eb 7(sus4,9,13)
  C suspended-fourth
  */
  const standardCharWidth = 17;
  const smallestCharWidth = bars.reduce((prev, bar, i) => {
    const width = barWidth / bar.chords.length;
    const maxChorStringLength = getLengthFromLongestChordString(bar);
    const charWidth = maxChorStringLength ? width / maxChorStringLength : 0;
    return !prev ? charWidth : prev > charWidth ? charWidth : prev;
  }, null);

  if (standardCharWidth < smallestCharWidth) return 1;

  return smallestCharWidth / standardCharWidth;
};

const getLengthFromLongestChordString = bar =>
  bar.chords.reduce((prev, chord, j) => {
    const chordStringLength = ["pitch", "chordType", "sup"].reduce(
      (prev, key) => {
        return prev + (chord[key] ? chord[key].length : 0);
      },
      0
    );
    return !prev || chordStringLength > prev ? chordStringLength : prev;
  }, null);
