const timeSignature = (bars, barView) => {
        let timeSig = bars[0].timeSignature
        let attrTimeSig = {
            fill:'#000', 
            'font-size': 20, 
            'text-anchor': 'start'
        }
        let timeSigX = bars[0].dimensions.x -15 
        let baseY = bars[0].dimensions.y + barView.bar.height / 2
        let distance = 9
        return [{
            x:  timeSigX,
            y:  baseY - distance ,
            text: timeSig[0].toString(),
            attr:attrTimeSig
        },{
            x: timeSigX ,
            y: baseY + distance ,
            text: timeSig[1].toString(),
            attr:attrTimeSig
        }]
}
export default timeSignature
