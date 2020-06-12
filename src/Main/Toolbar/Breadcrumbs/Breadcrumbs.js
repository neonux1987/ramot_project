// LIBRARIES
import React from "react";

const Breadcrumbs = ({ className = "", navigationPath = "" }) => {
  return (
    <div className={className} style={{ marginRight: "10px", fontWeight: "600", fontSize: "15px" }}>
      {navigationPath}
    </div>
  );

}

export default React.memo(Breadcrumbs);