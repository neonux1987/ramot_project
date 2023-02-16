import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { css } from "emotion";
import React from "react";
import SettingsIcon from "../Icons/SettingsIcon";

const _select = css`
  text-align: center;
  background-color: #ffffff;
  color: #000000;
  border-radius: 6px;

  :before {
    border-bottom: none;
    display: none;
  }

  :after {
    border-bottom: none;

    :hover:not {
      border: none;
    }
  }

  :hover {
    background-color: #fafafa;
  }
`;

const _classesSelect = css`
  padding: 8px 10px 6px 10px !important;
  font-weight: 500;

  :focus {
    background: none;
  }
`;

const _classesSelectIcon = css`
  display: none;
`;

const SelectButton = ({ onClick, label = "ללא שם" }) => {
  return (
    <Select
      className={_select}
      value={label}
      classes={{ select: _classesSelect, icon: _classesSelectIcon }}
      onClick={onClick}
      open={false}
    >
      <MenuItem value={label}>
        <SettingsIcon />
      </MenuItem>
    </Select>
  );
};

export default SelectButton;
