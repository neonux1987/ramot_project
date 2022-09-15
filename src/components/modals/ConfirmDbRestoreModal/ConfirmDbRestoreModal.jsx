import React from "react";

import WarningModal from "../modalTypes/WarningModal";

const ConfirmDbRestoreModal = (props) => {
  return (
    <WarningModal
      id={ConfirmDbRestoreModal}
      contentText={`
      המערכת תבצע שיחזור ותדרוס את הקבצים הקיימים
      האם ברצונך להמשיך?
      `}
      {...props}
    />
  );
};

export default ConfirmDbRestoreModal;
