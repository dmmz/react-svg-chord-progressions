import BarView from '../src/BarView.js'

describe('BarView ', () => {
  describe('constructor', () => {
    test('constructor with no params', () => {
      const barView = new BarView()

      expect(barView.barsPerLine).toBeDefined()

      expect(barView.margins).toHaveProperty('top')
      expect(barView.margins).toHaveProperty('left')
      expect(barView.margins).toHaveProperty('right')
      expect(barView.margins).toHaveProperty('line')
      expect(barView.margins).toHaveProperty('bottom')

      expect(barView.bar).toHaveProperty('padding')
      expect(barView.bar).toHaveProperty('width')
      expect(barView.bar).toHaveProperty('repetitionLineSpace')
      expect(barView.bar).toHaveProperty('padding')

      expect(barView.bar.padding).toHaveProperty('top')
      expect(barView.bar.padding).toHaveProperty('left')

    })

    test('constructor with some values', () => {
      const barView = new BarView({
        margins:{
          top: 100
        },
        bar:{
          height: 200
        }
      })
      expect(barView.barsPerLine).toBeDefined()

      expect(barView.margins.top).toEqual(100)
      expect(barView.margins).toHaveProperty('left')

      expect(barView.bar.height).toEqual(200)
      expect(barView.bar).toHaveProperty('padding')
    })

    test('constructor with deep property values', () => {
      const barView = new BarView({
        bar:{
          padding:{
            left:300
          }
        }
      })
      expect(barView.bar.padding.left).toEqual(300)
      expect(barView.bar).toHaveProperty('width')
    })
  });
  describe('barView methods', () => {
    let barView
    beforeAll(() => {
      barView = new BarView()
    })
    describe('getDimensions', () => {

      test('should throw exception if no arguments', () => {
        const fn = () => { barView.getDimensions() }
        expect(fn).toThrow()
      })

      test('should return array of 2 numbers', () => {
        let dimensions = barView.getDimensions(0)
        expect(dimensions).toHaveLength(2)
        expect(dimensions[0]).toBeGreaterThanOrEqual(0)
        expect(dimensions[1]).toBeGreaterThanOrEqual(0)
      })

    })
    describe('getDivisor', () => {
      test('should work for ternary time signature', () => {
        expect(barView.getDivisor('34', 'whole')).toEqual(1)
        expect(barView.getDivisor('34', 'half')).toEqual(2)
        expect(barView.getDivisor('34', 'quarter')).toEqual(2)
      })
      test('should work for 4/4 time signature', () => {
        expect(barView.getDivisor('44', 'whole')).toEqual(1)
        expect(barView.getDivisor('44', 'half')).toEqual(2)
        expect(barView.getDivisor('44', 'quarter')).toEqual(4)
      })
      test('undefined time signature should work like 4/4', () => {
        expect(barView.getDivisor(undefined, 'whole')).toEqual(1)
        expect(barView.getDivisor(undefined, 'half')).toEqual(2)
        expect(barView.getDivisor(undefined, 'quarter')).toEqual(4)
      })
    });
    describe('getStartXList', () => {
      test('should throw exception if durations is not array', () => {
        const fn = () => { barView.getStartXList('34','not an array') }
        expect(fn).toThrow()
      })
      test('should return array of same length as durations', () => {
        const durations = ['whole','quarter','half','quarter']
        expect(barView.getStartXList('44', durations)).toHaveLength(durations.length)
      })
    });
    describe('getHeight', () => {
      test('should throw exception if there are no arguments', () => {
        expect(() => { barView.getHeight()}).toThrow()
      })
      test('should return a number', () => {
        expect(barView.getHeight(10)).toBeGreaterThanOrEqual(0)
      })
      test('should return a a number (determined by margin) if argument is 0', () => {
        expect(barView.getHeight(0)).toBeGreaterThanOrEqual(0)
      })

    });
  })
});
