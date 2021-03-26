import React from 'react';
import Row from './Row';

const HeaderRow = ({ gridTemplateColumns, style = {}, children, className }) => {
  return (
    <Row
      style={{
        //boxShadow: "0px 9px 19px -8px rgb(0 0 0 / 5%)",
        borderTop: "1px solid #ececec",
        //borderLeft: "1px solid #ececec",
        position: "relative",
        //backgroundColor: "#fafafa",
        //textShadow: "0px 0px 4px #00000012",
        //boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.07)",
        //boxShadow: "1px 3px 4px 0 rgb(0 0 0 / 4%)",
        borderBottom: "1px solid #ececec",
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