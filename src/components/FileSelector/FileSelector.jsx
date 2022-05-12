// LIBRARIES
import React from 'react';
import { css } from 'emotion';
import { TextField } from '@material-ui/core';

// COMPONENTS
import WhiteButton from '../buttons/WhiteButton';

const textFieldRoot = css`
margin-top: 0px;
  width: 580px;
  background-color: #ffffff;
`;

const textFieldInput = css`
padding: 9px 14px;
direction: ltr;
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
      {onOpenClick ? <WhiteButton margin="0 0 0 8px" onClick={onOpenClick}>{onOpenButtonLabel}</WhiteButton> : null}
      {onChangeClick ? <WhiteButton margin="0 0 0 8px" onClick={onChangeClick}>{onChangebuttonLabel}</WhiteButton> : null}

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