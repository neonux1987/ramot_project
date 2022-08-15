import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import { css } from "emotion";

const _header = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  background-color: #ffffff;
  height: 80px;
`;

const _dialogTitle = css`
  padding-right: 12px;
  flex: initial;
  color: #000000;
`;

const _icon = css`
  margin-right: 15px;
`;

const ModalHeader = (props) => {
  const { iconColor = "#000000", title, Icon } = props;

  return (
    <div className={_header}>
      <Icon className={_icon} color={iconColor} />
      <DialogTitle
        id="alert-dialog-slide-title"
        classes={{ root: _dialogTitle }}
      >
        {title}
      </DialogTitle>
    </div>
  );
};

export default ModalHeader;
