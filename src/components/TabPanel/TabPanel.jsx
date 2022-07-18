import React from "react";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`expanses-codes-tab-panel-${index}`}
      aria-labelledby={`expanses-codes-tab-panel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
