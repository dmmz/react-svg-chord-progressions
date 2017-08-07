'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var timeSignature = function timeSignature(bars, barView) {
    var timeSig = bars[0].timeSignature;
    var attrTimeSig = {
        fill: '#000',
        'font-size': 20,
        'text-anchor': 'start'
    };
    var timeSigX = bars[0].dimensions.x - 15;
    var baseY = bars[0].dimensions.y + barView.bar.height / 2;
    var distance = 9;
    return [{
        x: timeSigX,
        y: baseY - distance,
        text: timeSig[0].toString(),
        attr: attrTimeSig
    }, {
        x: timeSigX,
        y: baseY + distance,
        text: timeSig[1].toString(),
        attr: attrTimeSig
    }];
};
exports.default = timeSignature;