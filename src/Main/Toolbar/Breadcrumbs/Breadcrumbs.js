// LIBRARIES
import React from "react";

const Breadcrumbs = ({ className = "", navigationPath = "" }) => {
  return (
    <div className={className}>
      {navigationPath}
    </div>
  );

}

export default React.memo(Breadcrumbs);