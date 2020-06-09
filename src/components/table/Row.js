import React from 'react';

export default ({ style = {}, children, gridTemplateColumns = "unset", className = "" }) => {
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