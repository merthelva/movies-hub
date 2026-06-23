import { useEffect, useRef } from "react";

const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;

    return () => {
      isFirstRender.current = true;
    };
  }, []);

  return isFirstRender.current;
};

export { useIsFirstRender };
