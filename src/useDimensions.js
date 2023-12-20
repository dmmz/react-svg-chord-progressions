import { useState, useEffect, useRef } from "react";

const dimensionsEvent = 'chords-dimensions-update';

const useDimensions = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateDimensions = () => {
    if (!ref.current || !ref.current.getBoundingClientRect().width) {
      console.warn("width of wrapping div is 0 so nothing will be drawn");
      return;
    }
    const { width, top } = ref.current.getBoundingClientRect();
    setWidth(width);
    setHeight(window.innerHeight - top);
  }

  useEffect(() => {
    updateDimensions();

    const handleUpdateDimensions = () => updateDimensions();
    window.addEventListener(dimensionsEvent, handleUpdateDimensions);

    return () => {
      window.removeEventListener(dimensionsEvent, handleUpdateDimensions);
    }  
  }, [ref.current]);

  return { divRef: ref, width, height };
};

export default useDimensions;
