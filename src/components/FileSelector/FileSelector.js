// LIBRARIES
import React from 'react';
import { css } from 'emotion';
import classnames from 'classnames';
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


export default ({ className = "", onClick, value = "", buttonLabel = "פתח מיקום" }) => {

  return (
    <div className={className}>
      <PrimaryButton onClick={onClick}>{buttonLabel}</PrimaryButton>
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