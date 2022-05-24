import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { css } from 'emotion';

const _header = css`
  display: flex; 
  align-items: center;
  border-bottom: 1px solid #dddddd;
  background-color: rgb(23 110 193);
  height: 70px;
`;

const _dialogTitle = css`
  padding-right: 12px;
  flex: initial;
  color: #ffffff;
`;

const ModalHeader = (props) => {

  const {
    iconColor = "#ffffff",
    title,
    Icon
  } = props;

  return <div className={_header}>
    <Icon
      className={css`
    margin-right: 15px;
    color: ${iconColor};
    font-size: 28px;
  `}
    />
    <DialogTitle id="alert-dialog-slide-title" classes={{ root: _dialogTitle }}>{title}</DialogTitle>
  </div>;
}

export default ModalHeader;