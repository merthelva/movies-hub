import { useState, useEffect } from "react";

const useDebounce = <TValue>(value: TValue, delay: number = 500): TValue => {
  const [debouncedValue, setDebouncedValue] = useState<TValue>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
