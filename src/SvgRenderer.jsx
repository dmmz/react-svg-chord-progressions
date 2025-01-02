import React from "react";

class SvgRenderer {
  constructor() {
    this.paths = [];
    this.texts = [];
    this.circles = [];
    this.rects = [];
  }
  addObject(obj) {
    for (let key in obj) {
      this[key] = this[key].concat(obj[key]);
    }
  }
  addRects(arr) {
    this.addObject({ rects: arr });
  }
  addTexts(arr) {
    this.addObject({ texts: arr });
  }
  render() {
    let svgElems = [];

    if (this.paths.length) {
      svgElems = svgElems.concat(
        this.paths.map((data, i) => {
          if (typeof data === "object") {
            const { d, ...props } = { ...data };
            return <path key={`p${i}`} d={d} {...props} />;
          }

          return (
            <path key={`p${i}`} d={data} stroke="black" strokeWidth="1px" />
          );
        })
      );
    }
    if (this.texts.length) {
      svgElems = svgElems.concat(
        this.texts.map((props, i) => {
          let text;
          ({ text, ...props } = props);
          return (
            <text key={`t${i}`} {...props}>
              {text}
            </text>
          );
        })
      );
    }

    if (this.circles.length)
      svgElems = svgElems.concat(
        this.circles.map((props, i) => {
          return <circle key={`c${i}`} {...props} />;
        })
      );

    if (this.rects.length) {
      svgElems = svgElems.concat(
        this.rects.map((props, i) => {
          return <rect key={`r${i}`} {...props} />;
        })
      );
    }
    return svgElems;
  }
}
export default SvgRenderer;
