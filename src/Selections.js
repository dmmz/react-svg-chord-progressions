
const Selections = (() => {

    const getLineChange = (bars, barView, i) => {
        const isNotLast = (arr, pos) => pos < arr.length - 1

        while (isNotLast(bars, i) && bars[i].dimensions.y === bars[i + 1].dimensions.y)
            i++

        let dims = [{
            x: bars[i].dimensions.x + barView.bar.width,
            y: bars[i].dimensions.y
        }]

        if (isNotLast(bars, i))
            dims.push({
                x: bars[i + 1].dimensions.x,
                y: bars[i + 1].dimensions.y
            })

        return {i, dims}
    }

    const getRectsDims = (bars, barView, startX, selection) => {
        let rectsDims = []
        //start x,y
        const startBar = bars[selection.start.bar].dimensions
        const startChordX = startX[selection.start.bar][selection.start.chord]
        const x = startBar.x + startChordX
        const y = startBar.y
        //end x,y
        const endBar = bars[selection.end.bar].dimensions
        const endY = endBar.y
        const endBarChordsX = startX[selection.end.bar]
        const endX = selection.end.chord === endBarChordsX.length - 1 ?
                endBar.x + barView.bar.width : endBar.x + endBarChordsX[selection.end.chord + 1]

        if (y === endY) rectsDims.push({x, y, endX, endY})
        else {
            let prevDims, i, dims
            let isFirst = true, lineChanges = []

            let tmpY = y
            let iBar = selection.start.bar
            while (tmpY !== endY) {
                ;({i, dims} =  getLineChange(bars, barView, iBar))
                iBar = i + 1
                tmpY = dims[1].y

                if (isFirst){
                    isFirst = false
                    rectsDims.push({x, y, endX: dims[0].x, endY:dims[0].y})
                }else{
                    rectsDims.push({x: prevDims.x, y:prevDims.y, endX: dims[0].x, endY:dims[0].y})
                }
                prevDims = dims[1]
            }
            rectsDims.push({x: prevDims.x, y:prevDims.y, endX, endY})
        }
        return rectsDims
    }
    const getRects = (bars, barView, startX, selections) => {
        let totalRectsDims = [], rectsDims
        for (let selection of selections){
            rectsDims = getRectsDims(bars, barView, startX, selection).map((dims,i) => {
                const color = selection.color || '#00F'
                return {
                    x: dims.x,
                    y: dims.y,
                    width: dims.endX - dims.x,
                    height: barView.bar.height,
                    attr:{fill: color, 'fill-opacity':0.3, stroke: color, 'stroke-opacity':1 }
                }
            })
            totalRectsDims = [...totalRectsDims, ...rectsDims]
        }
        return totalRectsDims
    }

    return {getRects, getRectsDims, getLineChange}
})()

export default Selections
