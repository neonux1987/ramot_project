const negative = {
  color: "#ffffff",
  backgroundColor: "#ff0000b3"
}

const positive = {
  color: "#ffffff",
  backgroundColor: "#008000b3"
}

const neutral = {
  color: "#000000",
  backgroundColor: "#ffff00b3"
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