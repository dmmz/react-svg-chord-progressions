'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRaphael = require('react-raphael');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        key: 'addPaths',
        value: function addPaths(arr) {
            this.addObject({ paths: arr });
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
            if (this.paths.length) svgElems = svgElems.concat(this.paths.map(function (data, i) {
                if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
                    var props = Object.assign({}, data);
                    delete props.d;
                    return _react2.default.createElement(_reactRaphael.Path, { key: 'path' + i, d: data.d, attr: props });
                } else {
                    return _react2.default.createElement(_reactRaphael.Path, { key: 'path' + i, d: data });
                }
            }));
            if (this.texts.length) svgElems = svgElems.concat(this.texts.map(function (props, i) {
                props.key = 'text' + i;
                return _react2.default.createElement(_reactRaphael.Text, props);
            }));
            if (this.circles.length) {
                console.log(this.circles);
                svgElems = svgElems.concat(this.circles.map(function (props, i) {
                    console.log('props');
                    console.log(props);
                    props.key = 'circle' + i;
                    return _react2.default.createElement(_reactRaphael.Circle, props);
                }));
            }
            if (this.rects.length) svgElems = svgElems.concat(this.rects.map(function (props, i) {
                props.key = 'rect' + i;
                return _react2.default.createElement(_reactRaphael.Rect, props);
            }));
            return svgElems;
        }
    }]);

    return SvgRenderer;
}();

exports.default = SvgRenderer;