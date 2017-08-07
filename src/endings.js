const endings = (bars, barView) => {
    let endingLines = bars
        .filter(bar => bar.ending != undefined)
        .map(bar => {
            let marginX = 4 
            let x =  bar.dimensions.x + marginX
            let y = bar.dimensions.y - 15
            return [
                "M"+ x +" "+ y +" l "+ (barView.bar.width - marginX)+" 0",
                "M"+ x +" "+ y +" l 0 10"
            ]
        })
    endingLines = [].concat.apply([], endingLines)

    let endingNumbers =  bars
        .filter(bar => bar.ending != undefined)
        .map(bar => ({
            x: bar.dimensions.x + 4 + 4,
            y:  bar.dimensions.y - 8,
            text: bar.ending.toString(),
            attr: { 
                fill:'#000', 
                'font-size':10, 
                'text-anchor': 'start'
            }
        }))
    return {
        texts: endingNumbers,
        paths: endingLines
    }
}
export default endings
