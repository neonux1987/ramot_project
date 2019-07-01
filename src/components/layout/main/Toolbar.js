import React from "react";

const Toolbar = (props) => {

  return (
    <div style={{ padding: "10px 24px", boxShadow: "0px 1px 4px #ccc", background: "rgb(255, 255, 255)", fontSize: "14px", color: "#40484c", fontWeight: "600", borderBottom: "1px solid #ccc" }}>
      {`${props.buildingName} / ${props.header} / חודש ${props.month} / שנה ${props.year}`}
    </div>
  );

}

export default Toolbar;