import Selections from '../src/Selections.js'

const barView = {bar: {
    width: 50,
    height: 100
}}
const bars = [
    {dimensions:{x:0,y:0}}, {dimensions:{x:50,y:0}},{dimensions:{x:100,y:0}},{dimensions:{x:150,y:0}},
    {dimensions:{x:0,y:100}},{dimensions:{x:50,y:100}},{dimensions:{x:100,y:100}},{dimensions:{x:150,y:100}},
    {dimensions:{x:0,y:200}},{dimensions:{x:50,y:200}},{dimensions:{x:100,y:200}},{dimensions:{x:150,y:200}},
    {dimensions:{x:0,y:300}},{ dimensions:{x:50,y:300}},{dimensions:{x:100,y:300}},{dimensions:{x:150,y:300}}
] 

//e.g:  Am    | Dm | G7    | C Am |
//      F Gm  | D  | Bb Eb | F G  |
const startX = [
    [2], [2], [2],[2, 27],
    [2, 27],[2], [2, 27],[2, 27]
    [2], [2], [2],[2],
    [2], [2], [2],[2]
]

const firstLineChange = [{x:200,y:0},{x:0,y:100}]

test('selections get line change', () => {
    let {dims} = Selections.getLineChange(bars, barView, 1)
    expect(dims).toEqual(firstLineChange)
})

test('selections get line change from another position in same line', () => {
    let {dims} = Selections.getLineChange(bars, barView, 2)
    expect(dims).toEqual(firstLineChange)
})

//this case in practice should never arrive, because line changes will be always between start and end bar
//there can never be an end bar after last bar
//anyway, we include it, so that getLineChange to prevent bugs in the call of getLineChange
test('selections get line change: case of last bar', () => {
    let {dims} = Selections.getLineChange(bars, barView, 13)
    expect(dims).toEqual([{x:200,y:300}])
})

test('selections finishing in middle of bar', () => {
    
    //e.g. Am  |[ Dm | G7 | C ] Am |...  
    const selection = {
        start:{bar:1, chord: 0},
        end:{bar:3, chord:0},
        color:'#F00'
    }
    expect(Selections.getRectsDims(bars, barView, startX, selection)).toEqual([{x:52,y:0,endX:177,endY:0}])
}) 
test('selections finishing in middle of bar', () => {
    //e.g. Am  |[ Dm | G7 | C ] Am |...  
    const selection = {
        start:{bar:1, chord: 0},
        end:{bar:3, chord:1},
        color:'#F00'
    }
    expect(Selections.getRectsDims(bars, barView, startX, selection)).toEqual([{x:52,y:0,endX:200,endY:0}])
})

test('selections including two bar lines', () => {
    
    const selection = {
        start:{bar:3, chord: 0},
        end:{bar:4, chord:1},
        color:'#F00'
    }
    expect(Selections.getRectsDims(bars, barView, startX, selection))
        .toEqual([
            {x:152,y:0,endX:200,endY:0},
            {x:0,y:100,endX:50,endY:100}
        ])

}) 
test('selections including three bar lines', () => {
    
    const selection = {
        start:{bar:1, chord: 0},
        end:{bar:10, chord:0},
        color:'#F00'
    }
    expect(Selections.getRectsDims(bars, barView, startX, selection))
        .toEqual([
            {x:52,y:0,endX:200,endY:0},
            {x:0,y:100,endX:200,endY:100},
            {x:0,y:200,endX:150,endY:200}
        ])
}) 
