import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children, className }) => {
  return (
    <Row
      style={{
        boxShadow: "rgba(53, 64, 82, 0.05) 0px 0px 14px 0px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
        position: "relative",
        zIndex: "2",
        ...style,
      }}
      gridTemplateColumns={gridTemplateColumns}
      className={className}
    >
      {children}
    </Row>
  );
}