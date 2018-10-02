'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getTimeSignature = function getTimeSignature(bars, barView) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!bars[0].timeSignature) {
    throw new TypeError('first bar has no time signature');
  }

  var DEFAULT_SIZE = 20;
  var DEFAULT_COLOR = '#000';
  var color = settings.color || DEFAULT_COLOR;
  var size = settings.size || DEFAULT_SIZE;

  var timeSig = bars[0].timeSignature;
  var attrTimeSig = {
    fill: color,
    'font-size': size,
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
exports.default = getTimeSignature;