import { useState, useEffect, useRef } from "react";

const useDimensions = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current || !ref.current.getBoundingClientRect().width) {
      console.warn("width of wrapping div is 0 so nothing will be drawn");
      return;
    }
    const { width, top } = ref.current.getBoundingClientRect();
    setWidth(width);
    setHeight(window.innerHeight - top);
  }, [ref.current]);

  return { divRef: ref, width, height };
};

export default useDimensions;
