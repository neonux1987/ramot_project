import { DialogContentText } from "@material-ui/core";
import React from "react";
import { css } from "emotion";
import InfoModal from "../modalTypes/InfoModal";

const style = css`
  white-space: pre-line;
  text-align: right;
  width: 360px;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
`;

const BackupOnExitModal = (props) => {
  return (
    <InfoModal cancelBtnText={"צא ללא גיבוי"} id={BackupOnExitModal} {...props}>
      <DialogContentText className={style}>
        האם לבצע גיבוי בסיס נתונים ביציאה?
      </DialogContentText>
    </InfoModal>
  );
};

export default BackupOnExitModal;
