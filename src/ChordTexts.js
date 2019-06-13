const ChordTexts = (() => {
    const DEFAULT_SIZE_CHORD = 35
    const DEFAULT_SIZE_SUP = 25
    const DEFAULT_SIZE_BASS = 25

    const getSpecialSymbol = (chordType) => {
        if (chordType === 'maj7') return "\u2206"  //  ∆
        if (chordType === 'halfdim') return "\xF8";//  ø

        return chordType.replace('dim',"\u2218")  // ∘
    }
    const replaceFlat = str => str.replace(/b/g,"\u266D")
    const getAttr = fontSize => ({
        fill:'#000',
        fontSize,
        fontFamily: 'jazz-font,Verdana,Courier',
        textAnchor: 'start'
    })
    // repeat chord sign: %
    const getRepeatSign = (x, y) => {
      const MARGIN_REPEAT_SIGN = 10
      const STROKE_WIDTH = 3
      const sizeRepeatSign = DEFAULT_SIZE_CHORD * 2 / 3
      const repeatSignX = x + MARGIN_REPEAT_SIGN

      let circle = {r: 3, stroke: 'black', fill: 'black'}
      let circles = [
            {...circle, ...{cx: x + 12, cy: y - 10}},
            {...circle, ...{cx: x + 31, cy: y + 6 }}
        ]

        let lines = []
        lines.push({
            d: "M" + repeatSignX  +" "+ (y +  MARGIN_REPEAT_SIGN)
                + " l " + sizeRepeatSign + " " + (-DEFAULT_SIZE_CHORD + MARGIN_REPEAT_SIGN),
            strokeWidth: STROKE_WIDTH,
            stroke: 'black'
        })
        return {lines, texts:[], circles}

    }
    const getChordSvgElems = (chord, x, y) => {

        if (chord.same)
            return getRepeatSign(x, y)
        y += 5 //due to font, we have to put them 5 points higher
        let lines = []
        let chordText = replaceFlat(chord.pitch) + getSpecialSymbol(chord.chordType)
        let texts =  [{
            x,
            y,
            text: chordText,
            ...getAttr(DEFAULT_SIZE_CHORD)
        }]
        if (chord.sup) {
            texts.push({
                x: x + chordText.length * 14,
                y: y - DEFAULT_SIZE_CHORD / 3,
                text: replaceFlat(chord.sup.substr(1,chord.sup.length - 2)),//removing parenthesis
                ...getAttr(DEFAULT_SIZE_SUP)
            })
        }
        if (chord.bass) {
            let bassX = x + chordText.length * 10
            let bassY = y + 20
            texts.push({
                x: bassX,
                y: bassY,
                text: replaceFlat(chord.bass.substr(1, chord.bass.length)),
                ...getAttr(DEFAULT_SIZE_BASS)
            })
            lines.push({    
                d: "M"+ (bassX - 10) +" "+ ( y + 10 ) +" l 24 -15",
                strokeWidth: 3,
                stroke: 'black'
            })
        }
        let returnObj = {texts}
        if (lines.length)
            returnObj.lines = lines
        return returnObj
    }

    const getSvgElems = (bars, barView) => {

        const timeSignature = bars[0].timeSignature || "44"
        let barChordsText = bars.map(bar => {
            //we get startXList
            let startXList = barView.getStartXList(timeSignature, bar.chords.map(chord => chord.duration))

            //we add it as property to each chord
            let barChords = bar.chords.map((chord, i) => {
                chord.startX = startXList[i]
                return chord
            })

            let chordTexts = barChords.map((chord) => {
                let x = bar.dimensions.x + chord.startX
                let y = bar.dimensions.y + barView.bar.padding.top
                return getChordSvgElems(chord, x, y)
            })
            let lines = chordTexts.filter(chord => !!chord.lines)
                .map(chord => chord.lines)
            lines = [].concat.apply([], lines)

            let circles = chordTexts.filter(chord => !!chord.circles)
                .map(chord => chord.circles)
            circles = [].concat.apply([], circles)

            chordTexts = [].concat.apply([], chordTexts.map(chord => chord.texts))
            return {startXList, chordTexts, lines, circles}
        })

        let barCircles  = [].concat.apply([], barChordsText.filter(bar => !!bar.circles).map(bar => bar.circles))
        let barLines  = [].concat.apply([], barChordsText.filter(bar => !!bar.lines).map(bar => bar.lines))
        let startXList = barChordsText.map(bar => bar.startXList)
        barChordsText = [].concat.apply([],barChordsText.map(bar => bar.chordTexts))

        let returnObj = {
            texts: barChordsText,
            startX: startXList
        }

        if (barLines) returnObj.paths = barLines
        if (barCircles) returnObj.circles = barCircles

        return returnObj
    }
    return {
        getChordSvgElems,
        getSvgElems
    }
})()

export default ChordTexts
