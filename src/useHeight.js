import { useState, useEffect } from "react";

const heightEvent = "chords-height-update";

const useHeight = (ref) => {
  const [height, setHeight] = useState(null);

  const updateHeight = () => {
    const { top } = ref.current.getBoundingClientRect();
    setHeight(window.innerHeight - top);
  };

  useEffect(() => {
    window.addEventListener(heightEvent, updateHeight);

    return () => {
      window.removeEventListener(heightEvent, updateHeight);
    };
  }, [ref.current]);

  return height;
};

export default useHeight;
