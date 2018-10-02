

const Sections = (bars, settings = {}) => {
    const DEFAULT_TEXT_COLOR = '#000'
    const DEFAULT_TEXT_SIZE = 13

    const textColor = settings.textColor || DEFAULT_TEXT_COLOR
    const textSize = settings.textSize || DEFAULT_TEXT_SIZE

    const getX = bar => bar.dimensions.x + 15
    const getY = bar => bar.dimensions.y
    const getDefaultSettings = () => ({textColor, textSize})

    let sectionBars = bars.filter(bar => !!bar.section)

    let hRect = 15 //rectangle's height

    let sectionTexts = []
    let sectionRectangles = []
    let sectionText, sectionRect, yRect, yText, wRect

    sectionBars.forEach((bar) => {

        yRect = getY(bar) - hRect - 5
        yText = yRect + 0.4 * hRect
        wRect = 10 + 5 * bar.section.length // rectangle's width

        sectionTexts.push({
            x: getX(bar),
            y: yText,
            text: bar.section,
            attr: {fill: textColor, 'font-size': textSize}
        })

        sectionRectangles.push({
            x: getX(bar) - wRect / 2,
            y: yRect,
            width: wRect,
            height: hRect
        })
    })
    return {
        getDefaultSettings,
        getSections: () => ({
          texts: sectionTexts,
          rects: sectionRectangles
        })
    }
}
export default Sections
