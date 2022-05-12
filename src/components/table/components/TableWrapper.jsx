import React from 'react'

const TableWrapper = ({ printMode, children, id, colors = true, height = "initial" }) => {
  return printMode ? <table
    id={id}
    style={{
      filter: colors ? "none" : "grayscale(100%)",
      fontFamily: "sans-serif",
    }}
  >
    {children}
  </table> : <div id={id} style={{ height }}>{children}</div>;
}

export default TableWrapper;