import React from 'react';

export default ({ style = {}, children, gridTemplateColumns = "unset" }) => {
  return (
    <div
      className="_tableRow"
      style={{
        gridTemplateColumns: gridTemplateColumns,
        ...style
      }}>
      {children}
    </div>
  );
}