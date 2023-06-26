import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const resizeInterval = 100;
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  useLayoutEffect(() => {
    let timeoutId: number;

    const calculateSize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(
        () =>
          setWindowSize({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
          }),
        resizeInterval
      );
    };

    window.addEventListener("resize", calculateSize);

    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  return windowSize;
};

export default useWindowSize;
