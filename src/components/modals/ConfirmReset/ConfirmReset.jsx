import React from "react";

import WarningModal from "../modalTypes/WarningModal";

const ConfirmReset = (props) => {
  return (
    <WarningModal
      id={ConfirmReset}
      contentText={`
      המערכת תבצע איפוס ותדרוס קבצים קיימים
      האם ברצונך להמשיך?
      `}
      {...props}
    />
  );
};

export default ConfirmReset;
