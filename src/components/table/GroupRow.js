import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      style={{
        borderBottom: "none",
        borderTopRightRadius: "4px",
        borderTopLeftRadius: "4px",
        borderTop: "1px solid #e3eaec",
        borderLeft: "1px solid #e3eaec",
        ...style
      }}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Row>
  );
}