'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvgRenderer = function () {
    function SvgRenderer() {
        _classCallCheck(this, SvgRenderer);

        this.paths = [];
        this.texts = [];
        this.circles = [];
        this.rects = [];
    }

    _createClass(SvgRenderer, [{
        key: 'addObject',
        value: function addObject(obj) {
            for (var key in obj) {
                this[key] = this[key].concat(obj[key]);
            }
        }
    }, {
        key: 'addRects',
        value: function addRects(arr) {
            this.addObject({ rects: arr });
        }
    }, {
        key: 'addTexts',
        value: function addTexts(arr) {
            this.addObject({ texts: arr });
        }
    }, {
        key: 'render',
        value: function render() {
            var svgElems = [];

            if (this.paths.length) {
                svgElems = svgElems.concat(this.paths.map(function (data, i) {

                    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
                        var _data = _extends({}, data),
                            d = _data.d,
                            props = _objectWithoutProperties(_data, ['d']);

                        return _react2.default.createElement('path', _extends({ d: d }, props));
                    }

                    return _react2.default.createElement('path', { d: data, stroke: 'black', strokeWidth: '1px' });
                }));
            }
            if (this.texts.length) {
                svgElems = svgElems.concat(this.texts.map(function (props, i) {
                    var text = void 0;
                    var _props = props;
                    text = _props.text;
                    props = _objectWithoutProperties(_props, ['text']);

                    return _react2.default.createElement(
                        'text',
                        props,
                        text
                    );
                }));
            }

            if (this.circles.length) svgElems = svgElems.concat(this.circles.map(function (props, i) {
                return _react2.default.createElement('circle', props);
            }));

            if (this.rects.length) {
                svgElems = svgElems.concat(this.rects.map(function (props, i) {
                    return _react2.default.createElement('rect', props);
                }));
            }
            return svgElems;
        }
    }]);

    return SvgRenderer;
}();

exports.default = SvgRenderer;