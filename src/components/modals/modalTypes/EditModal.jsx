import React from "react";
import FilledEditIcon from "../../Icons/FilledEditIcon";

import Modal from "../Modal";

const EditModal = (props) => {
  return <Modal Icon={FilledEditIcon} agreeBtnText={"שמור"} {...props} />;
};

export default EditModal;
