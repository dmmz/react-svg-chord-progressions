import React, { useState, useEffect, useRef } from "react";

import Endings from "./Endings";
import ChordTexts from "./ChordTexts";
import getBarLines from "./getBarLines";
import Sections from "./Sections";
import getTimeSignature from "./getTimeSignature";
import SvgRenderer from "./SvgRenderer";
import BarView from "./BarView";
import Selections from "./Selections";
import PropTypes from "prop-types";
import transformChords from "./transformChords";

const propTypes = {
  width: PropTypes.number.isRequired,
  bars: PropTypes.array.isRequired,
  BarMouseUp: PropTypes.func,
  BarMouseDown: PropTypes.func,
  BarMouseOver: PropTypes.func,
  colorSelected: PropTypes.string,
  colorActive: PropTypes.string,
  activeBar: PropTypes.number,
  selectedBars: PropTypes.array
};

const getScale = (bars, barWidth) => {
  /*
  F maj7
  Db maj7
  B halfdim
  F# halfdim
  F 7(sus4,9)
  Eb 7(sus4,9)
  Db major-13th
  Ab 7(#11,9,13)
  Eb 7(sus4,9,13)
  C suspended-fourth
  */
  bars.reduce((prev, bar) => {
    const width = barWidth / bar.chords.length;
    const maxChorStringLength = bar.chords.reduce((prev, chord) => {
      const chordStringLength = ["pitch", "chordType", "sup"].reduce(
        (prev, key) => {
          return prev + (!!chord[key] ? chord[key].length : 0);
        },
        0
      );
      return !prev || chordStringLength < prev ? chordStringLength : prev;
    }, null);
    return prev + bar.chords[0].pitch;
  }, "");
};
const SvgChordProgression = props => {
  let barView = new BarView({
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
  // logic in constructor: it won't be updated with a render caused by receiving new props,
  // has to be updated with a 'key' prop change,
  // this is done for performance reasons
  const bars = props.bars
    .map(bar => transformChords(bar))
    .map((bar, i) => barView.setDimensions(bar, i));

  const svg = new SvgRenderer();

  getScale(bars, barView.bar.width);

  const chordTexts = ChordTexts(0.8);
  const { startX, ...chordTextsSvgElems } = chordTexts.getSvgElems(
    bars,
    barView
  );

  svg.addObject(chordTextsSvgElems);
  svg.addObject(Sections(bars, barView).getSections());
  svg.addObject(getBarLines(bars, barView));
  svg.addObject(Endings(bars, barView).getEndings());
  svg.addTexts(getTimeSignature(bars, barView));

  const barsRender = () => {
    const emptyFn = () => {};

    const colorSelected = props.colorSelected || "#00f";
    const selectedBars = props.selectedBars || [-1, -1];

    const colorActive = props.colorActive || "#f00";
    const activeBar = props.activeBar === undefined ? -1 : props.activeBar;

    const opacity = 0.4;

    const barMouseDown = props.barMouseDown || emptyFn;
    const barMouseOver = props.barMouseOver || emptyFn;
    const barMouseUp = props.barMouseUp || emptyFn;

    let barComponents = [],
      barProps,
      isSelected,
      isCursorBar;

    for (let [i, bar] of bars.entries()) {
      isSelected = i >= selectedBars[0] && i <= selectedBars[1];
      isCursorBar = i === activeBar;

      barProps = {
        key: "bar" + i,
        width: barView.bar.width,
        height: barView.bar.height,
        fill: isCursorBar ? colorActive : isSelected ? colorSelected : "#fff",
        fillOpacity: isSelected || isCursorBar ? opacity : 0,
        strokeOpacity: 0,
        mousedown: e => {
          e.preventDefault();
          barMouseDown(i);
        },
        mouseover: e => {
          e.preventDefault();
          barMouseOver(i);
        },
        mouseup: e => {
          e.preventDefault();
          barMouseUp(i);
        }
      };

      barComponents.push({ ...bar.dimensions, ...barProps });
    }
    return barComponents.map(props => <rect {...props} />);
  };
  const selectionsRender = selections => {
    if (!selections || !selections.length) return;

    const rects = Selections.getRects(bars, barView, startX, selections);
    return rects.map((props, i) => <rect key={i} {...props} />);
  };

  return (
    <svg width={props.width} height={barView.getHeight(bars.length)}>
      {svg.render()}
      {barsRender()}
      {/*selectionsRender(props.selections)*/}
    </svg>
  );
};
const ChordProgression = props => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current || !ref.current.getBoundingClientRect().width) return;
    setWidth(ref.current.getBoundingClientRect().width);
  }, [ref.current]);

  return (
    <div ref={ref}>
      {!!width && <SvgChordProgression width={width} {...props} />}
    </div>
  );
};

export default ChordProgression;
