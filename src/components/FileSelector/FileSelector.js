// LIBRARIES
import React from 'react';
import { css } from 'emotion';
import { TextField } from '@material-ui/core';

// COMPONENTS
import PrimaryButton from '../Buttons/PrimaryButton';

const textFieldRoot = css`
margin-top: 0px;
  width: 580px;
  background-color: #ffffff;
`;

const textFieldInput = css`
padding: 9px 14px;
direction: ltr;
`;

const buttonStyle = css`
  margin-left:6px;
`;

const FileSelector = ({
  className = "",
  onChangeClick,
  onOpenClick,
  value = "",
  onChangebuttonLabel = "שנה מיקום",
  onOpenButtonLabel = "פתח תיקייה"
}) => {

  return (
    <div className={className}>
      {onOpenClick ? <PrimaryButton className={buttonStyle} onClick={onOpenClick}>{onOpenButtonLabel}</PrimaryButton> : null}
      {onChangeClick ? <PrimaryButton className={buttonStyle} onClick={onChangeClick}>{onChangebuttonLabel}</PrimaryButton> : null}

      <TextField
        id="outlined-bare"
        disabled
        classes={{ root: textFieldRoot }}
        value={value}
        onChange={() => { }}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare', className: textFieldInput }}
      />
    </div>
  );
}

export default FileSelector;