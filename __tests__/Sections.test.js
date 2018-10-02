import Sections from '../src/Sections'
import aloneTogether from './chord-charts/alone-together'
import BarView from '../src/BarView'
describe('Sections', () => {

  test('should work without default settings', () => {
    let fakeBars = [{},{}]
    const defaultSettings = Sections(fakeBars).getDefaultSettings()
    expect(defaultSettings.textColor).toBeDefined()
    expect(defaultSettings.textSize).toBeDefined()
  })
  test('should work with default settings', () => {
    let fakeBars = [{},{}]
    const settings = {textColor:'#00F', textSize: 40}
    const defaultSettings = Sections(fakeBars, settings).getDefaultSettings()
    expect(defaultSettings.textColor).toBe('#00F')
    expect(defaultSettings.textSize).toBe(40)
  })
  test('should return as much texts and rectangles as section bars', () => {
    const barView = new BarView()
    const bars = aloneTogether.map((bar, i) => barView.setDimensions(bar, i))
    const numSectionBars = bars.filter(bar => !!bar.section).length
    const {texts, rects} = Sections(bars).getSections()
    expect(texts).toHaveLength(numSectionBars)
    expect(rects).toHaveLength(numSectionBars)
  })

});
