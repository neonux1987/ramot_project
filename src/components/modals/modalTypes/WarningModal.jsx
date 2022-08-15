import React from "react";
import WarningIcon from "../../Icons/WarningIcon";

import Modal from "../Modal";

const WarningModal = (props) => {
  return (
    <Modal
      Icon={WarningIcon}
      title={"אזהרה"}
      agreeBtnText={"המשך"}
      iconColor={"rgb(231, 234, 28)"}
      {...props}
    />
  );
};

export default WarningModal;
