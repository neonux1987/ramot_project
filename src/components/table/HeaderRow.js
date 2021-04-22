import React from 'react';
import Row from './Row';

const HeaderRow = ({ gridTemplateColumns, style = {}, children, className }) => {
  return (
    <Row
      id="headerRow"
      style={{
        //boxShadow: "0px 9px 19px -8px rgb(0 0 0 / 5%)",
        borderTop: "1px solid #f1f1f1",
        //borderLeft: "1px solid #f1f1f1",
        position: "relative",
        backgroundColor: "#fafafa",
        //textShadow: "0px 0px 4px #00000012",
        //boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.07)",
        //boxShadow: "1px 3px 4px 0 rgb(0 0 0 / 4%)",
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 2px 2px 1px",
        borderBottom: "1px solid #f1f1f1",
        zIndex: "2",
        fontSize: "16px",
        ...style,
      }}
      gridTemplateColumns={gridTemplateColumns}
      className={className}
    >
      {children}
    </Row>
  );
}

export default HeaderRow;