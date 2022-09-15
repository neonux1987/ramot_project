import React from "react";

import InfoModal from "../modalTypes/InfoModal";

const LeaveWithoutSavingModal = (props) => {
  return (
    <InfoModal
      id={LeaveWithoutSavingModal}
      cancelBtnText={"הישאר"}
      contentText={`
      האם אתה בטוח שברצונך להמשיך ללא שמירת ההגדרות?
      `}
      {...props}
    />
  );
};

export default LeaveWithoutSavingModal;
