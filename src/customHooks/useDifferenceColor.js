import { useCallback } from "react";

const negative = {
  color: "#ff0000"
}

const positive = {
  color: "#10b110"
}

const neutral = {
  color: "#000000"
}

const useDifferenceColor = () => {

  const whichColor = useCallback((value) => {
    if (value < 0)
      return negative
    else if (value > 0)
      return positive;
    else
      return neutral;
  }, []);

  return [whichColor];
};

export default useDifferenceColor;