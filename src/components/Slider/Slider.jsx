import React, { useState } from "react";
import MuiSlider from "@material-ui/core/Slider";

const Slider = ({ value, onBlur, ...newProps }) => {
  const [newValue, setNewValue] = useState(value);

  const onChange = (_, value) => {
    setNewValue(value);
  };

  return (
    <MuiSlider
      {...newProps}
      value={newValue}
      onChange={onChange}
      onMouseUp={onBlur}
    />
  );
};

export default Slider;
