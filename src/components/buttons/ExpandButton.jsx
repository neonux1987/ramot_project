import React from 'react';
import { Button } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import { css } from 'emotion';

const expandIconCss = css`
  font-size: 40px;
  color: #ffffff;
  transition: transform ease 0.3s;  
`;

const rotate = css`
  transform: rotate(180deg);
`;

const ExpandButton = ({ checked, onClick }) => {
  return (
    <Button onClick={onClick}><ExpandLess className={`${expandIconCss} ${!checked ? rotate : ""}`} /></Button>
  );
}

export default ExpandButton;