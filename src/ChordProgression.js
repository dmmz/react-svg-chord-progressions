import React from 'react'
import Endings from './Endings'
import ChordTexts from './ChordTexts'
import getBarLines from './getBarLines'
import Sections from './Sections'
import getTimeSignature from './getTimeSignature'
import SvgRenderer from './SvgRenderer'
import BarView from './BarView'
import Selections from './Selections'
import PropTypes from 'prop-types'

class ChordProgression extends React.Component {
     static propTypes = {
        width: PropTypes.number.isRequired,
        bars: PropTypes.array.isRequired,
        BarMouseUp: PropTypes.func,
        BarMouseDown: PropTypes.func,
        BarMouseOver: PropTypes.func,
        colorSelected: PropTypes.string,
        colorActive: PropTypes.string,
        activeBar: PropTypes.number,
        selectedBars: PropTypes.array
    }
    constructor(props){
        super(props)
        let barView = new BarView({
            width: props.width,
            barsPerLine: 4,
            sub: 10,
            sup: 10,
            margins: {
                top:    20,
                left:   20,
                line:   30,
                right:  20
            },
            bar: {
                padding: {
                    top:    25,
                    left:   8
                },
                height: 40,
                repetitionLineSpace: 4
            }
        })
        // logic in constructor: it won't be updated with a render caused by receiving new props,
        // has to be updated with a 'key' prop change,
        // this is done for performance reasons
        this.bars = props.bars.map((bar, i) => barView.setDimensions(bar,i))
        this.svg = new SvgRenderer()
        const {startX, ...chordTextsSvgElems} = ChordTexts.getSvgElems(this.bars, barView)
        this.startX = startX

        this.svg.addObject(chordTextsSvgElems)
        this.svg.addObject(Sections(this.bars, barView).getSections())
        this.svg.addObject(getBarLines(this.bars, barView))
        this.svg.addObject(Endings(this.bars, barView).getEndings())
        this.svg.addTexts(getTimeSignature(this.bars, barView))

        this.barView = barView
    }
    barsRender() {
        const emptyFn = () => {}

        const colorSelected = this.props.colorSelected || "#00f"
        const selectedBars = this.props.selectedBars || [-1, -1]

        const colorActive = this.props.colorActive || "#f00"
        const activeBar = this.props.activeBar === undefined ? -1 : this.props.activeBar

        const opacity = 0.4

        const barMouseDown = this.props.barMouseDown || emptyFn
        const barMouseOver = this.props.barMouseOver || emptyFn
        const barMouseUp = this.props.barMouseUp || emptyFn

        let barComponents = [], barProps, isSelected, isCursorBar

        for (let [i,bar] of this.bars.entries()) {
            isSelected = i >= selectedBars[0] && i <= selectedBars[1]
            isCursorBar = i === activeBar

            barProps = {
                key: 'bar' + i,
                width:  this.barView.bar.width,
                height: this.barView.bar.height,
                fill: isCursorBar ? colorActive : isSelected ? colorSelected : "#fff",
                fillOpacity: isSelected || isCursorBar ? opacity : 0,
                strokeOpacity: 0,
                mousedown:  (e) => { e.preventDefault(); barMouseDown(i)},
                mouseover:  (e) => { e.preventDefault(); barMouseOver(i)},
                mouseup:    (e) => { e.preventDefault(); barMouseUp(i)}
            }

            barComponents.push({...bar.dimensions, ...barProps})
        }
        return barComponents.map((props) => <rect {...props} />)
    }
    selectionsRender(selections){
        if (!selections || !selections.length)
            return

        const rects = Selections.getRects(this.bars, this.barView, this.startX, selections)
        return rects.map((props, i) => <rect key={i}  {...props}/>)
    }
    render() {
        return (<svg width={this.props.width} height={this.barView.getHeight(this.bars.length)}>
                {this.svg.render()}
                {this.barsRender()}
                {/*this.selectionsRender(this.props.selections)*/}
                </svg>)
    }
}
export default ChordProgression
