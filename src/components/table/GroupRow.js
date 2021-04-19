import React from 'react';
import Row from './Row';

const GroupRow = ({ gridTemplateColumns, style = {}, children }) => {
  return (
    <Row
      id="groupRow"
      style={{
        borderBottom: "none",
        borderTopRightRadius: "0px",
        borderTopLeftRadius: "0px",
        borderTop: "1px solid #ececec",
        position: "relative",
        //borderLeft: "1px solid #ececec",
        //borderRight: "1px solid #ececec",
        backgroundColor: "#fafafa",
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

export default GroupRow;