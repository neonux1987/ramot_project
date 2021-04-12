const negative = {
  color: "#ffffff",
  backgroundColor: "#FF0947"
}

const positive = {
  color: "#ffffff",
  backgroundColor: "#07BB7E"
}

const neutral = {
  color: "#000000",
  backgroundColor: "#ffffff"
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