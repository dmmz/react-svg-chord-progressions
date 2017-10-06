import BarView from '../src/BarView.js'

test('BarView test', () => {
    let barView = new BarView({
        sub:  10,
        sup:  10,
        margins: {line:70} 
    })
    expect(barView.barsPerLine).toBe(4)
    expect(barView.margins.line).toBe(70)
})
