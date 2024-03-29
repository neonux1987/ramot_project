import React from "react";
import { Select as MuiSelect, InputLabel, MenuItem } from "@material-ui/core";
import { css } from "emotion";
import Spinner from "../Spinner/Spinner";
import classnames from "classnames";

const _container = css`
  display: flex;
  margin: 0 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 170px;
  height: 38px;
  overflow: hidden;
  box-shadow: 0px 1px 8px -4px #0000001f;
`;

const _label = css`
  color: #000000;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: 500;
  width: 110px;
  border-left: 1px solid #dddddd;
  justify-content: center;
  background: #f5f5f5;
`;

const _select = css`
  text-align: center;
  margin: 0 5px;
  width: inherit;
  background-color: #ffffff;
  font-size: 16px;
  color: #000000;
  font-weight: 400;

  :before {
    border-bottom: none;
  }

  :after {
    border-bottom: none;
  }
`;

const _classesSelect = css`
  padding: 8px 0 6px 24px;
  font-weight: 400;

  :focus {
    background: none;
  }
`;

const Select = ({
  label,
  name,
  value,
  disabled,
  onChange,
  loading = false,
  displayEmpty = false,
  emptyLabel = "אנא בחר",
  children,
  selectStyle,
  blackLabels = false,
}) => {
  const render = loading ? (
    <Dummy selectStyle={selectStyle} />
  ) : (
    <MuiSelect
      name={name}
      className={classnames(_select, selectStyle)}
      value={value}
      disabled={disabled}
      onChange={onChange}
      classes={{ select: _classesSelect }}
      displayEmpty={displayEmpty}
    >
      {displayEmpty ? (
        <MenuItem value={""} disabled>
          {emptyLabel}
        </MenuItem>
      ) : null}
      {children}
    </MuiSelect>
  );

  return (
    <div className={_container}>
      {label && (
        <InputLabel
          className={classnames(
            _label,
            css`
              color: ${blackLabels ? "#000000" : "#000000"};
            `
          )}
          id="label"
        >
          {label}
        </InputLabel>
      )}
      {render}
    </div>
  );
};

export default React.memo(Select);

const Dummy = ({ selectStyle }) => {
  return (
    <div className={classnames(_select, selectStyle)}>
      <Spinner size={18} />
    </div>
  );
};
