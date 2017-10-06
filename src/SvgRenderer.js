import React from 'react';
import {Path, Text, Circle, Rect} from 'react-raphael';
class SvgRenderer{
    constructor(){
        this.paths = [];
        this.texts = [];
        this.circles = [];
        this.rects = [];
    }
    addObject(obj) {
        for (let key in obj) {
            this[key] = this[key].concat(obj[key])
        }
    }
    addPaths(arr) {
        this.addObject({paths: arr})
    }
    addRects(arr) {
        this.addObject({rects: arr})
    }
    addTexts(arr) {
        this.addObject({texts: arr})
    }
    render(){
        let svgElems = [];
        if (this.paths.length)
            svgElems = svgElems.concat(this.paths.map((data, i) => {
                if (typeof data === 'object') {
                    let props = Object.assign({},data)
                    delete props.d
                    return <Path key={'path' + i} d={data.d} attr={props}/>
                }else{
                    return <Path key={'path' + i} d={data}/>
                }

            }))
        if (this.texts.length)
            svgElems = svgElems.concat(this.texts.map((props, i) => {
                props.key = 'text' + i
                return <Text {...props}/>
            }))
        if (this.circles.length)
            svgElems = svgElems.concat(this.circles.map((props, i) => {
                props.key = 'circle' + i
                return <Circle {...props}/>
            }))
        if (this.rects.length)
            svgElems = svgElems.concat(this.rects.map((props, i) => {
                props.key = 'rect' + i
                return <Rect {...props}/>
            }))
        return svgElems
    }
}
export default SvgRenderer
