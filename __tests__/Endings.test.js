import Endings from '../src/Endings'
import BarView from '../src/BarView'
import aloneTogether from './chord-charts/alone-together'

describe('Endings', () => {
  let barView, fakeBars

  beforeAll(() => {
    barView = new BarView()
    fakeBars = [{},{}]
  })

  test('should throw exception if one of two arguments is missing', () => {
    expect(() => {Endings(null, barView)}).toThrow('bars must be a non-empty array')
    expect(() => {Endings(fakeBars)}).toThrow('barView argument required')
  })

  test('should work without default settings',() => {
    const defaultSettings = Endings(fakeBars,barView).getDefaultSettings()
    expect(defaultSettings.numberSize).toBeDefined()
    expect(defaultSettings.numberColor).toBeDefined()
  })

  test('should work with settings', () => {
    const settings = {numberSize: 20, numberColor:'#F00'}
    const defaultSettings = Endings(fakeBars,barView, settings).getDefaultSettings()
    expect(defaultSettings.numberSize).toBe(20)
    expect(defaultSettings.numberColor).toBe('#F00')

  })

  test('should return correct structure', () => {
    const barsWithDimensions  = aloneTogether.map((bar, i) => barView.setDimensions(bar, i))
    const {texts, paths} = Endings(barsWithDimensions, barView).getEndings()

    expect(paths).not.toHaveLength(0)
    paths.map(path => {
      expect(typeof path).toBe('string')
    })

    expect(texts).not.toHaveLength(0)
    texts.map(text => {
      expect(text.x).toBeGreaterThanOrEqual(0)
      expect(text.y).toBeGreaterThanOrEqual(0)
      expect(text).toHaveProperty('text')
      expect(typeof text.attr).toBe('object')

      expect(text.attr).toHaveProperty('fill')
      expect(text.attr).toHaveProperty('font-size')
      expect(text.attr).toHaveProperty('text-anchor')
    })

  })

});
