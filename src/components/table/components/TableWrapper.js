import React from 'react'

const TableWrapper = ({ printMode, children, id }) => {
  return printMode ? <table id={id}>{children}</table> : <div id={id}>{children}</div>;
}

export default TableWrapper;