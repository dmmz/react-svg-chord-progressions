const getX = bar => bar.dimensions.x + 15
const getY = bar => bar.dimensions.y

const sections = (bars) => {
    let sectionBars = bars.filter(bar => bar.section)
    let sectionText = sectionBars 
        .map((bar, i) => ({
            x: getX(bar),
            y: getY(bar),
            text: bar.section,
            attr: { fill:'#000', 'font-size':15}
        }))
    let width = 20
    let height = 20
    let sectionRectangles = sectionBars
        .map((bar, i) => ({
            x: getX(bar) - width / 2,
            y: getY(bar) - height / 2,
            width,
            height
        }))
    return {
        texts: sectionText,
        rects: sectionRectangles
    }
}
export default sections
