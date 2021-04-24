import React from 'react';

const TableRow = ({ style = {}, children, gridTemplateColumns = "unset", className = "" }) => {
  return (
    <div
      className={`tableRow ${className}`}
      style={{
        gridTemplateColumns: gridTemplateColumns,
        ...style
      }}>
      {children}
    </div>
  );
}

export default TableRow;