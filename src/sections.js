const getX = bar => bar.dimensions.x + 15
const getY = bar => bar.dimensions.y

const Sections = (bars) => {
    let sectionBars = bars.filter(bar => bar.section)
    
    let hRect = 15 

    let sectionTexts = []
    let sectionRectangles = []
    let sectionText, sectionRect, yRect, yText, wRect

    sectionBars.forEach((bar) => {
        
        yRect = getY(bar) - hRect - 5
        yText = yRect + 0.4 * hRect
        wRect = 10 + 5 * bar.section.length
        
        sectionTexts.push({
            x: getX(bar),
            y: yText,
            text: bar.section,
            attr: {fill:'#000', 'font-size':13}
        })
        sectionRectangles.push({
            x: getX(bar) - wRect / 2,
            y: yRect,
            width: wRect,
            height: hRect
        })
    })
    return {
        texts: sectionTexts,
        rects: sectionRectangles
    }
}
export default Sections
