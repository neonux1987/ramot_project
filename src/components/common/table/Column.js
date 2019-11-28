import React from 'react';

export default ({ children, style, show = true }) => {
  return (
    <div style={{
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