import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      style={{
        borderBottom: "none",
        borderTopRightRadius: "4px",
        borderTopLeftRadius: "4px",
        borderTop: "1px solid rgba(0, 0, 0, 0.00)",
        borderLeft: "1px solid rgba(0, 0, 0, 0.00)",
        ...style
      }}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Row>
  );
}