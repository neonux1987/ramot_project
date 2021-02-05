import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      style={{
        borderBottom: "none",
        borderTopRightRadius: "0px",
        borderTopLeftRadius: "0px",
        borderTop: "1px solid #e3eaec",
        borderLeft: "1px solid #e3eaec",
        backgroundColor: "rgb(247, 248, 249)",
        textShadow: "0px 0px 4px #00000012",
        fontSize: "15px",
        //boxShadow: "rgba(53, 64, 82, 0.05) 0px 0px 14px 0px",
        ...style
      }}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Row>
  );
}