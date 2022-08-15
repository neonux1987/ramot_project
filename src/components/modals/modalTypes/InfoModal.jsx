import React from "react";

import Modal from "../Modal";
import InfoIcon from "../../Icons/InfoIcon";

const InfoModal = (props) => {
  return (
    <Modal
      Icon={InfoIcon}
      title={"הודעה"}
      agreeBtnText={"המשך"}
      iconColor={"rgb(28, 148, 234)"}
      {...props}
    />
  );
};

export default InfoModal;
