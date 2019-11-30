import React from 'react';
import { bgcolor } from '@material-ui/system';
import { spawn } from 'child_process';

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