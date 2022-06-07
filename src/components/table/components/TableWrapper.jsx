import React from "react";

const TableWrapper = ({
  printMode,
  children,
  id,
  colors = true,
  height = "initial",
  isFullscreen = false,
}) => {
  const fullscreenPadding = isFullscreen ? "20px 0 0" : "20px 20px 20px";
  const printModePadding = printMode ? "0" : "20px 20px 20px";
  return printMode ? (
    <table
      id={id}
      style={{
        filter: colors ? "none" : "grayscale(100%)",
        fontFamily: "sans-serif",
      }}
    >
      {children}
    </table>
  ) : (
    <div
      id={id}
      style={{
        height,
        padding: printMode ? printModePadding : fullscreenPadding,
      }}
    >
      {children}
    </div>
  );
};

export default TableWrapper;
