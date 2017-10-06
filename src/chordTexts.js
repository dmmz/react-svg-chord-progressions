const chordTexts = (bars, barView) => { 
    const fontSizeChord = 35
    const fontSizeSup = 25 
    const fontSizeBass = 28 

    const getSpecialSymbol = (chordType) => {
        if (chordType === 'maj7') return"\u2206" 
        if (chordType === 'halfdim') return "\xF8"; 
        
        return chordType.replace('dim',"\u25CB")

    }
    const getAttr = fontSize => ({ 
        fill:'#000', 
        'font-size':fontSize, 
        'font-family': 'jazz-font,Verdana,Courier',
        'text-anchor': 'start'
    })
    let barChordsText = bars.map(bar => { 
        //we get startXList
        let startXList = barView.getStartXList(bar.chords.map(chord => chord.duration))
        //we add it as property to each chord     
        let barChords = bar.chords.map((chord, i) => {
            chord.startX = startXList[i]
            return chord
        })
        
        let chordTexts = barChords.map((chord) => {
            let x = bar.dimensions.x + chord.startX
            let y = bar.dimensions.y + barView.bar.padding.top
            let chordText =  chord.same ? '%' : 
                chord.pitch.replace(/b/g,"\u266D") + getSpecialSymbol(chord.chordType)
            let texts =  [{
                x,
                y, 
                text: chordText,
                attr: getAttr(fontSizeChord)
            }]
            if (chord.sup) {
                texts.push({
                    x: x + chordText.length * 14,
                    y: y - fontSizeChord / 3,
                    text: chord.sup.substr(1,chord.sup.length - 2).replace(/b/g,"\u266D"),//removing parenthesis
                    attr: getAttr(fontSizeSup) 
                })
            }
            let bassLines = []
            if (chord.bass) {
                let bassX = x + chordText.length * 10 
                let bassY = y + 22 
                texts.push({
                    x: bassX,
                    y: bassY,
                    text: chord.bass.substr(1, chord.bass.length),
                    attr: getAttr(fontSizeBass) 
                })
                bassLines.push({
                    d: "M"+ (bassX - 8) +" "+ (bassY - 7) +" l 24 -10",
                    "stroke-width": 3
                })
            }
            let returnObj = {texts}
            if (bassLines.length)
                returnObj.bassLines = bassLines
            return returnObj
        })
        let bassLines = chordTexts.filter(chord => !!chord.bassLines) 
            .map(chord => chord.bassLines)
        bassLines =  [].concat.apply([], bassLines)
        chordTexts = [].concat.apply([], chordTexts.map(chord => chord.texts))
        return {chordTexts, bassLines}
    })
    let barBassLines  = [].concat.apply([],barChordsText.map(bar => bar.bassLines))
    barChordsText = [].concat.apply([],barChordsText.map(bar => bar.chordTexts))
    return {
        texts: barChordsText,
        paths: barBassLines
    }
}
export default chordTexts
