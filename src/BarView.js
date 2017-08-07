class BarView {
    
    constructor(props) {

        let width = props.width || 750
        this.barsPerLine = props.barsPerLine || 4
        this.margins = Object.assign({},{
            top:    20,
            left:   20,
            line:   30,
            right:  20
        },props.margins)

        this.bar = Object.assign({},{
            paddingTop: 25,
            paddingLeft:8,
            height: 40
        }, props.bar) 
        this.bar.width = (width - this.margins.left - this.margins.right) / this.barsPerLine
    }

    getDimensions(numBar) {
        let posBar = numBar % this.barsPerLine // bar position 
        let line = Math.floor(numBar / this.barsPerLine) // lineNumber
        let x = this.margins.left + this.bar.width * posBar
        let y = this.margins.top + (this.bar.height + this.margins.line) * line
        return [x, y]
    }
    getStartXList(durations){
        let widthList = durations.map(duration  => {
            let divisor = duration === 'quarter'  ?  4 :
                          duration === 'half'     ?  2 : 1  
            return (this.bar.width - this.bar.padding.left) / divisor
        })
        var currentX = this.bar.padding.left;
        let startXList = [currentX];
        for (let i = 0; i < widthList.length - 1; i++) {//don't care about last width, getting starting points
            currentX += widthList[i];
            startXList.push(currentX)
        }
        return startXList;
    }
    getWritableBarWidth() {
        return this.bar.width - this.bar.padding.left
    }
    getHeight(totalBars){
        const marginBottom = 20
        return Math.ceil(totalBars / this.barsPerLine) * (this.bar.height + this.margins.line) + marginBottom
    }
}
export default BarView;
