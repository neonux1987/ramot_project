import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children, className }) => {
  return (
    <Row
      style={{
        //boxShadow: "0px 9px 19px -8px rgb(0 0 0 / 5%)",
        borderTop: "1px solid #e3eaec",
        borderLeft: "1px solid #e3eaec",
        position: "relative",
        backgroundColor: "rgb(247, 248, 249)",
        borderBottom: "1px solid #b3bcbf",
        //textShadow: "0px 0px 4px #00000012",
        zIndex: "2",
        fontSize: "15px",
        ...style,
      }}
      gridTemplateColumns={gridTemplateColumns}
      className={className}
    >
      {children}
    </Row>
  );
}