import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      style={{
        ...style,
        borderBottom: "none",
        boxShadow: "0 2px 15px 0 rgba(0,0,0,.15)"
      }}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Row>
  );
}