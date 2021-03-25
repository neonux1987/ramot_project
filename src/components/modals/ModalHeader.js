import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { css } from 'emotion';

const _header = css`
  display: flex; 
  align-items: center;
`;

const _dialogTitle = css`
  padding-right: 12px;
  flex: initial;
`;

const ModalHeader = (props) => {

  const {
    iconColor = "#ffffff",
    title,
    Icon
  } = props;

  return <div className={_header}>
    <Icon className={css`
    margin: 16px 24px 16px 0;
    color: ${iconColor};
    font-size: 28px;
  `}
    />
    <DialogTitle id="alert-dialog-slide-title" classes={{ root: _dialogTitle }}>{title}</DialogTitle>
  </div>;
}

export default ModalHeader;