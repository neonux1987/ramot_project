import React from 'react';
import Select from '@material-ui/core/Select';
import { css } from 'emotion';
import MenuItem from '@material-ui/core/MenuItem';

const _select = css`
  text-align: center;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #dddddd;
  border-radius: 6px;

  :before {
    border-bottom: none;
  } 

  :after {
    border-bottom: none;
    
    :hover:not{
      border: none;
    }
  } 
`;

const _classesSelect = css`
  padding: 8px 10px 6px 24px;
  font-weight: 500;

  :focus {
    background: none;
  }
`;

const SelectButton = ({ onClick, label = "ללא שם" }) => {

  return (
    <Select
      className={_select}
      value={label}
      classes={{ select: _classesSelect }}
      onClick={onClick}
      open={false}
    >
      <MenuItem value={label}>פעולות נוספות</MenuItem>
    </Select>
  );

}

export default SelectButton;