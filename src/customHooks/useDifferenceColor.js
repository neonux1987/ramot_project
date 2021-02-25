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
    console.log(value);
    switch (value) {
      case value < 0: return negative;
      case value > 0: return positive;
      default: return neutral;
    }

  };


  return [whichColor];
};

export default useDifferenceColor;