// LIBRARIES
import React from "react";

const VatInfo = ({ className = "", tax = "אין" }) => {
  return (
    <div className={className}>
      <span>מע"מ: </span>{tax}
    </div>
  );

}

export default React.memo(VatInfo);