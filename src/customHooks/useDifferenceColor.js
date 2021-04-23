const negative = {
  color: "#ffffff",
  background: "#FF0947"
}

const positive = {
  color: "#ffffff",
  background: "#07BB7E"
}

const neutral = {
  color: "#000000"
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