import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      style={{
        borderBottom: "none",
        //boxShadow: "0 2px 15px 0 rgba(0,0,0,.15)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
        position: "relative",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 0px 14px -5px",
        zIndex: "2",
        ...style,
      }}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Row>
  );
}