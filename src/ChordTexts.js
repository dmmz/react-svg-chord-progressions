const ChordTexts = (() => { 
    const fontSizeChord = 35
    const fontSizeSup = 25 
    const fontSizeBass = 28 

    const getSpecialSymbol = (chordType) => {
        if (chordType === 'maj7') return"\u2206" 
        if (chordType === 'halfdim') return "\xF8"; 
        
        return chordType.replace('dim',"\u2218")

    }
    const replaceFlat = str => str.replace(/b/g,"\u266D")
    const getAttr = fontSize => ({ 
        fill:'#000', 
        'font-size':fontSize, 
        'font-family': 'jazz-font,Verdana,Courier',
        'text-anchor': 'start'
    })
    // repeat chord sign: %
    const getRepeatSign = (x, y) => {
        const sizeRepeatSign = fontSizeChord * 2/3
        const marginRepeatSign = 10 
        const repeatSignX = x + marginRepeatSign
        
        let circle = {r: 3, attr: {stroke: 'black', fill: 'black'}}
        let circles = [
            Object.assign({},{x: x + 12, y: y - 10}, circle),
            Object.assign({},{x: x + 31, y: y + 6 }, circle)
        ] 
        
        let lines = []
        lines.push({
            d: "M"+ repeatSignX  +" "+ (y +  marginRepeatSign) 
                + " l " + sizeRepeatSign + " " + (-fontSizeChord + marginRepeatSign),
            "stroke-width": 3
        })
        return {lines, texts:[], circles}
    
    }
    const getChordSvgElems = (chord, x, y) => {

        if (chord.same)
            return getRepeatSign(x, y)
        y = y - 5 //due to new font, we have to put them 5 points higher 
        let lines = []
        let chordText = replaceFlat(chord.pitch) + getSpecialSymbol(chord.chordType)
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
                text: replaceFlat(chord.sup.substr(1,chord.sup.length - 2)),//removing parenthesis
                attr: getAttr(fontSizeSup) 
            })
        }
        if (chord.bass) {
            let bassX = x + chordText.length * 10 
            let bassY = y + 22 
            texts.push({
                x: bassX,
                y: bassY,
                text: replaceFlat(chord.bass.substr(1, chord.bass.length)),
                attr: getAttr(fontSizeBass) 
            })
            lines.push({
                d: "M"+ (bassX - 8) +" "+ (bassY - 3) +" l 24 -10",
                "stroke-width": 3
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
            return {chordTexts, lines, circles}
        })

        let barCircles  = [].concat.apply([], barChordsText.filter(bar => !!bar.circles).map(bar => bar.circles))
        let barLines  = [].concat.apply([], barChordsText.filter(bar => !!bar.lines).map(bar => bar.lines))
        barChordsText = [].concat.apply([],barChordsText.map(bar => bar.chordTexts))
        let returnObj = {
            texts: barChordsText
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
