import chordTexts from '../src/ChordTexts.js'

test('ChordTexts getChordSvgElems', () => {
    let svgElems
    
    //Am7
    svgElems = chordTexts.getChordSvgElems({
        pitch:'A',
        chordType:'m7'
    }, 0, 0)
    
    expect(svgElems.texts).toHaveLength(1)
    expect(svgElems).not.toEqual(
        expect.objectContaining({lines: expect.anything()})
    )
    
    //Am7/G
    svgElems = chordTexts.getChordSvgElems({
        pitch:'A',
        chordType:'m7',
        bass:'/G'
    }, 0, 0)
    expect(svgElems.texts).toHaveLength(2)
    expect(svgElems.lines).toHaveLength(1)
    

    svgElems = chordTexts.getChordSvgElems({
        same:true
    }, 0, 0)
    expect(svgElems.texts).toHaveLength(0)
    expect(svgElems.lines).toHaveLength(1)
    expect(svgElems.circles).toHaveLength(2)
    
    //console.log(svgElems)
    //expect(svgElems.rects).toHaveLength(2)
    //expect(svgElems.cirl

});
