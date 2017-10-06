/** get diagonal repeat lines: looks something like
 *   /             \
    |.             .|
    |.  A m  Gm7   .|
     \             /
*/
const getRepeatLines = (dims, type) => {
    //x and y determine the diagonal line's length 
    let y = 5
    let x = 7
    
    let drawX = type === 'backward' ? -(x) : x
    let moveX = type === 'backward' ? dims.xEnd : dims.x
    return [
        "M"+ moveX + " " + dims.y    + " l " + drawX + " " + (-y),
        "M"+ moveX + " " + dims.yEnd + " l " + drawX + " " + y
    ]    
}

/* get the points in the repetition
 *  |:  A m7   |  Gm7  :|
 * */
const getRepetitionCircles = (bars, barView) => {

    const yDistance = 4  // from y center of bar to point (either point above or below)
    const xDistance = 4  // distance from bar to points

    const getY = (y, type) => {
        let fDist = type === 'up' ? -yDistance : yDistance
        return y + barView.bar.height / 2 + fDist 
    }
    const getCircles = (bar, barView) => {
        let circle = { 
            r:1,
            attr:{
                stroke:'black'
            }
        }
        let x = bar.repeat === 'forward' ? 
            bar.dimensions.x + xDistance : 
            bar.dimensions.x + barView.bar.width - xDistance
        
        let y1 = getY(bar.dimensions.y, 'up') 
        let y2 = getY(bar.dimensions.y, 'down') 
        
        let circle1 = Object.assign({},circle,{x, y:y1})
        let circle2 = Object.assign({},circle,{x, y:y2})
        return [circle1, circle2]
    }
    
    let repetitionCircles = bars
        .filter(bar => !!bar.repeat)
        .map(bar => {
            return getCircles(bar, barView)
        })
    return [].concat.apply([],repetitionCircles)
}
const getBarLines = (bars, barView) => {
    if (!barView.bar || barView.bar.width === undefined || barView.bar.height === undefined
        || barView.bar.repetitionLineSpace === undefined)
        throw "getBarLines: some parameters missing"

    let barLines = bars.map(bar => {
        let dims = {
            x: bar.dimensions.x,
            y: bar.dimensions.y,
            xEnd: bar.dimensions.x + barView.bar.width,
            yEnd: bar.dimensions.y + barView.bar.height
        }
        let line = ["M"+ dims.xEnd +" "+ dims.y +" l 0 "+ barView.bar.height]

        if (bar.endSection) 
            line.push("m"+ (dims.xEnd - barView.bar.repetitionLineSpace) +" "+ dims.y 
                         + " l 0 "+ barView.bar.height)
        
        if (bar.repeat){
            if(bar.repeat === 'forward'){ 
                line.push("m"+ dims.x +" "+ dims.y +" l 0 "+ barView.bar.height)
            }
            line = line.concat(getRepeatLines(dims, bar.repeat))       
        }
        return line
    })
    barLines = [].concat.apply([],barLines)
    return {
        paths: barLines,
        circles: getRepetitionCircles(bars,barView)
    }
}
export default getBarLines
