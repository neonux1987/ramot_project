import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children, className }) => {
  return (
    <Row
      style={{
        //boxShadow: "0px 9px 19px -8px rgb(0 0 0 / 5%)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
        position: "relative",
        backgroundColor: "#f2f3f9",
        textShadow: "0px 0px 4px #00000012",
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