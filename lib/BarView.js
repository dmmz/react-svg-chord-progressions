'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BarView = function () {
    function BarView(props) {
        _classCallCheck(this, BarView);

        var width = props.width || 750;
        this.barsPerLine = props.barsPerLine || 4;
        this.margins = Object.assign({}, {
            top: 20,
            left: 20,
            line: 30,
            right: 20
        }, props.margins);

        this.bar = Object.assign({}, {
            paddingTop: 25,
            paddingLeft: 8,
            height: 40
        }, props.bar);
        this.bar.width = (width - this.margins.left - this.margins.right) / this.barsPerLine;
    }

    _createClass(BarView, [{
        key: 'getDimensions',
        value: function getDimensions(numBar) {
            var posBar = numBar % this.barsPerLine; // bar position 
            var line = Math.floor(numBar / this.barsPerLine); // lineNumber
            var x = this.margins.left + this.bar.width * posBar;
            var y = this.margins.top + (this.bar.height + this.margins.line) * line;
            return [x, y];
        }
    }, {
        key: 'getStartXList',
        value: function getStartXList(durations) {
            var _this = this;

            var widthList = durations.map(function (duration) {
                var divisor = duration === 'quarter' ? 4 : duration === 'half' ? 2 : 1;
                return (_this.bar.width - _this.bar.padding.left) / divisor;
            });
            var currentX = this.bar.padding.left;
            var startXList = [currentX];
            for (var i = 0; i < widthList.length - 1; i++) {
                //don't care about last width, getting starting points
                currentX += widthList[i];
                startXList.push(currentX);
            }
            return startXList;
        }
    }, {
        key: 'getWritableBarWidth',
        value: function getWritableBarWidth() {
            return this.bar.width - this.bar.padding.left;
        }
    }, {
        key: 'getHeight',
        value: function getHeight(totalBars) {
            var marginBottom = 20;
            return Math.ceil(totalBars / this.barsPerLine) * (this.bar.height + this.margins.line) + marginBottom;
        }
    }]);

    return BarView;
}();

exports.default = BarView;