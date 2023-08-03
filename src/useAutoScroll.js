import { useEffect, useRef } from "react";

const heightMargin = 100;

const useAutoScroll = (bars, activeBar, ref) => {
  const lastRefY = useRef(null);

  useEffect(() => {
    const wrappingDiv = ref?.current?.getBoundingClientRect();
    const currentBarDims = bars[activeBar]?.dimensions;
    if (!wrappingDiv || !currentBarDims) {
      return;
    }

    const barTop = currentBarDims.y + wrappingDiv.top;
    const heightLimit = wrappingDiv?.height + wrappingDiv.top - heightMargin;

    const lastBarY = lastRefY.current;
    const currentBarY = currentBarDims.y;

    const isNewLoop = currentBarY < lastBarY;
    const isLineChange = currentBarY !== lastBarY;

    if (isNewLoop || activeBar === 0) {
      ref.current.scrollTo({ top: 0 });
    } else if (barTop > heightLimit && isLineChange) {
      ref.current.scrollBy({ top: 100, behavior: "smooth" });
    }

    lastRefY.current = currentBarDims.y;
  }, [activeBar, bars]);

  return ref;
};

export default useAutoScroll;
