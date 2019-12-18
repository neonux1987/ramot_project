import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      style={{
        borderBottom: "1px solid #fff",
        borderTopRightRadius: "4px",
        borderTopLeftRadius: "4px",
        borderTop: "1px solid rgba(0, 0, 0, 0.00)",
        borderLeft: "1px solid rgba(0, 0, 0, 0.00)",
        backgroundColor: "#eaeaea",
        ...style
      }}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Row>
  );
}