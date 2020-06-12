// LIBRARIES
import React from "react";

const VatInfo = ({ className = "", tax = "אין" }) => {
  return (
    <div className={className}>
      <span>מע"מ נוכחי: </span>{tax}
    </div>
  );

}

export default React.memo(VatInfo);