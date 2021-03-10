import React from 'react';

const Row = ({ style = {}, children, gridTemplateColumns = "unset", className = "" }) => {
  return (
    <div
      className={`_tableRow ${className}`}
      style={{
        gridTemplateColumns: gridTemplateColumns,
        ...style
      }}>
      {children}
    </div>
  );
}

export default Row;