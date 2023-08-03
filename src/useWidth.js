import { useState, useEffect, useRef } from "react";

const useWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current || !ref.current.getBoundingClientRect().width) {
      console.warn("width of wrapping div is 0 so nothing will be drawn");
      return;
    }
    setWidth(ref.current.getBoundingClientRect().width);
  }, [ref.current]);

  return { widthRef: ref, width };
};

export default useWidth;
