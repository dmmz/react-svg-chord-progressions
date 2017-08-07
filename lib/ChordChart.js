'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRaphael = require('react-raphael');

var _endings = require('./endings');

var _endings2 = _interopRequireDefault(_endings);

var _chordTexts = require('./chordTexts');

var _chordTexts2 = _interopRequireDefault(_chordTexts);

var _getBarLines = require('./getBarLines');

var _getBarLines2 = _interopRequireDefault(_getBarLines);

var _sections = require('./sections');

var _sections2 = _interopRequireDefault(_sections);

var _timeSignature = require('./timeSignature');

var _timeSignature2 = _interopRequireDefault(_timeSignature);

var _SvgRenderer = require('./SvgRenderer');

var _SvgRenderer2 = _interopRequireDefault(_SvgRenderer);

var _BarView = require('./BarView');

var _BarView2 = _interopRequireDefault(_BarView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChordChart = function (_React$Component) {
    _inherits(ChordChart, _React$Component);

    function ChordChart(props) {
        _classCallCheck(this, ChordChart);

        var _this = _possibleConstructorReturn(this, (ChordChart.__proto__ || Object.getPrototypeOf(ChordChart)).call(this, props));

        var barView = new _BarView2.default({
            width: props.width,
            barsPerLine: 4,
            sub: 10,
            sup: 10,
            margins: {
                top: 20,
                left: 20,
                line: 30,
                right: 20
            },
            bar: {
                padding: {
                    top: 25,
                    left: 8
                },
                height: 40,
                repetitionLineSpace: 4
            }
        });

        _this.bars = _this.setBarsDimensions(props.bars, barView);
        _this.svg = new _SvgRenderer2.default();
        _this.svg.addObject((0, _chordTexts2.default)(_this.bars, barView));
        _this.svg.addObject((0, _sections2.default)(_this.bars, barView));
        _this.svg.addObject((0, _getBarLines2.default)(_this.bars, barView));
        _this.svg.addObject((0, _endings2.default)(_this.bars, barView));
        _this.svg.addTexts((0, _timeSignature2.default)(_this.bars, barView));

        _this.barView = barView;
        return _this;
    }

    _createClass(ChordChart, [{
        key: 'setBarsDimensions',
        value: function setBarsDimensions(bars, barView) {
            return bars.map(function (bar, i) {
                var x = void 0,
                    y = void 0;

                var _barView$getDimension = barView.getDimensions(i);

                var _barView$getDimension2 = _slicedToArray(_barView$getDimension, 2);

                x = _barView$getDimension2[0];
                y = _barView$getDimension2[1];

                bar.dimensions = { x: x, y: y };
                return bar;
            });
        }
    }, {
        key: 'barsRender',
        value: function barsRender() {
            var _this2 = this;

            var emptyFn = function emptyFn() {};

            var colorSelected = this.props.colorSelected || "#00f";
            var selectedBars = this.props.selectedBars || [-1, -1];

            var colorActive = this.props.colorActive || "#f00";
            var activeBar = this.props.activeBar === undefined ? -1 : this.props.activeBar;

            var opacity = 0.4;

            var barMouseDown = this.props.barMouseDown || emptyFn;
            var barMouseOver = this.props.barMouseOver || emptyFn;
            var barMouseUp = this.props.barMouseUp || emptyFn;

            var barComponents = [],
                barProps = void 0,
                isSelected = void 0,
                isCursorBar = void 0;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var _step$value = _slicedToArray(_step.value, 2),
                        i = _step$value[0],
                        bar = _step$value[1];

                    isSelected = i >= selectedBars[0] && i <= selectedBars[1];
                    isCursorBar = i === activeBar;

                    barProps = {
                        key: 'bar' + i,
                        width: _this2.barView.bar.width,
                        height: _this2.barView.bar.height,
                        attr: {
                            fill: isCursorBar ? colorActive : isSelected ? colorSelected : "#fff",
                            'fill-opacity': isSelected || isCursorBar ? opacity : 0,
                            'stroke-opacity': 0
                        },
                        mousedown: function mousedown(e) {
                            e.preventDefault();barMouseDown(i);
                        },
                        mouseover: function mouseover(e) {
                            e.preventDefault();barMouseOver(i);
                        },
                        mouseup: function mouseup(e) {
                            e.preventDefault();barMouseUp(i);
                        }
                    };

                    barComponents.push(Object.assign({}, bar.dimensions, barProps));
                };

                for (var _iterator = this.bars.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return barComponents.map(function (props) {
                return _react2.default.createElement(_reactRaphael.Rect, props);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRaphael.Paper,
                { width: this.props.width, height: this.barView.getHeight(this.bars.length) },
                this.svg.render(),
                this.barsRender()
            );
        }
    }]);

    return ChordChart;
}(_react2.default.Component);

exports.default = ChordChart;