import React from "react";
import { useSelector } from "react-redux";
import ThemeContext from "../../context/ThemeContext";

const ThemeContextWrapper = (props) => {
  const settings = useSelector((store) => store.settings);

  return (
    <ThemeContext.Provider value={settings.data.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;
