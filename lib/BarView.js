'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BarView = function () {
  function BarView() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BarView);

    var DEFAULT_WIDTH = 750;
    var DEFAULT_BARS_PER_LINE = 4;
    var DEFAULT_MARGINS = {
      top: 20,
      left: 20,
      line: 30,
      right: 20,
      bottom: 20
    };
    var DEFAULT_BAR_DIMENSIONS = {
      padding: {
        top: 25,
        left: 8
      },
      height: 40,
      repetitionLineSpace: 4
    };

    this.barsPerLine = props.barsPerLine || DEFAULT_BARS_PER_LINE;
    this.margins = _extends({}, DEFAULT_MARGINS, props.margins);
    this.bar = _extends({}, DEFAULT_BAR_DIMENSIONS, props.bar);

    var width = props.width || DEFAULT_WIDTH;
    this.bar.width = (width - this.margins.left - this.margins.right) / this.barsPerLine;
  }

  _createClass(BarView, [{
    key: 'getDimensions',
    value: function getDimensions(numBar) {
      if (numBar == null) {
        throw new TypeError('numBar argument must be a number');
      }
      var posBar = numBar % this.barsPerLine; // bar position
      var line = Math.floor(numBar / this.barsPerLine); // lineNumber
      var x = this.margins.left + this.bar.width * posBar;
      var y = this.margins.top + (this.bar.height + this.margins.line) * line;
      return [x, y];
    }
  }, {
    key: 'setDimensions',
    value: function setDimensions(bar, numBar) {
      var _getDimensions = this.getDimensions(numBar),
          _getDimensions2 = _slicedToArray(_getDimensions, 2),
          x = _getDimensions2[0],
          y = _getDimensions2[1];

      bar.dimensions = { x: x, y: y };
      return bar;
    }
  }, {
    key: 'getDivisor',
    value: function getDivisor(timeSig, duration) {
      var divisor = void 0;
      if (timeSig == '34') divisor = duration === 'whole' ? 1 : 2;else divisor = duration === 'quarter' ? 4 : duration === 'half' ? 2 : 1;
      return divisor;
    }
  }, {
    key: 'getStartXList',
    value: function getStartXList(timeSig, durations) {
      var _this = this;

      if (!Array.isArray(durations)) {
        throw new TypeError('durations should be an array');
      }

      var widthList = durations.map(function (duration) {
        return (_this.bar.width - _this.bar.padding.left) / _this.getDivisor(timeSig, duration);
      });
      var currentX = this.bar.padding.left;
      var startXList = [currentX];

      // until length - 1 because don't care about last width, getting starting points
      for (var i = 0; i < widthList.length - 1; i++) {
        currentX += widthList[i];
        startXList.push(currentX);
      }
      return startXList;
    }
  }, {
    key: 'getHeight',
    value: function getHeight(totalBars) {
      if (totalBars == null) {
        throw new TypeError('totalBars should be a number');
      }
      return Math.ceil(totalBars / this.barsPerLine) * (this.bar.height + this.margins.line) + this.margins.bottom;
    }
  }]);

  return BarView;
}();

exports.default = BarView;