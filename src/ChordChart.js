import React from 'react'
import {Paper, Rect} from 'react-raphael'
import endings from './endings'
import chordTexts from './ChordTexts'
import getBarLines from './getBarLines'
import sections from './sections'
import timeSignature from './timeSignature'
import SvgRenderer from './SvgRenderer'
import BarView from './BarView'

class ChordChart extends React.Component {
    //static propTypes = {
        //width: PropTypes.integer.isRequired,
        //bars: PropTypes.array.isRequired,
        //BarMouseUp: PropTypes.func,
        //BarMouseDown: PropTypes.func,
        //BarMouseOver: PropTypes.func
    //}
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

        this.bars = this.setBarsDimensions(props.bars, barView)
        this.svg = new SvgRenderer() 
        this.svg.addObject(chordTexts.getSvgElems(this.bars, barView))
        this.svg.addObject(sections(this.bars, barView))
        this.svg.addObject(getBarLines(this.bars, barView))
        this.svg.addObject(endings(this.bars, barView))
        this.svg.addTexts(timeSignature(this.bars, barView))
        
        this.barView = barView
    }    
    setBarsDimensions(bars, barView) {
        return bars.map((bar, i) => {
            let x,y;    
            [x,y] = barView.getDimensions(i)     
            bar.dimensions = {x,y}
            return bar
        })
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
                attr: {
                    fill: isCursorBar ? colorActive : isSelected ? colorSelected : "#fff",
                    'fill-opacity': isSelected || isCursorBar ? opacity : 0,
                    'stroke-opacity': 0
                },
                mousedown:  (e) => { e.preventDefault(); barMouseDown(i)},
                mouseover:  (e) => { e.preventDefault(); barMouseOver(i)},
                mouseup:    (e) => { e.preventDefault(); barMouseUp(i)}
            }
           
            barComponents.push({...bar.dimensions, ...barProps})
        }
        barComponents.push({
            x:219, y:100, width:129,y:40, 
            attr:{fill:'#fff', 'fill-opacity':0.5,stroke:'#f00', 'stroke-opacity':1}
        })
        return barComponents.map((props) => <Rect {...props} />) 
 
    }
    render() {
        return (<Paper width={this.props.width} height={this.barView.getHeight(this.bars.length)}>
                {this.svg.render()}
                {this.barsRender()}
                </Paper>)
    }
}
export default ChordChart
