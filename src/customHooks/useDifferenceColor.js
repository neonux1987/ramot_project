const negative = {
  color: "#ffffff",
  backgroundColor: "rgb(239, 34, 91)"
}

const positive = {
  color: "#ffffff",
  backgroundColor: "rgb(49 199 120)"
}

const neutral = {
  color: "#000000",
  backgroundColor: "rgb(231, 255, 31)"
}

const useDifferenceColor = () => {

  const whichColor = (value) => {
    if (value < 0)
      return negative
    else if (value > 0)
      return positive;
    else
      return neutral;
  };

  return [whichColor];
};

export default useDifferenceColor;