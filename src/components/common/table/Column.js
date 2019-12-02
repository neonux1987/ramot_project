import React from 'react';

export default ({ bgColor = "", span = 1, children, style, show = true }) => {
  return (
    <div className="_tableColumn" style={{
      display: show ? "block" : "none",
      ...style
    }}>
      <div style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>{children}</div>
    </div>);
}