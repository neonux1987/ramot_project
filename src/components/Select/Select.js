import React from 'react';
import { Select as Selec, InputLabel, MenuItem } from '@material-ui/core';
import { css } from 'emotion';
import Spinner from '../Spinner/Spinner';
import classnames from 'classnames';

const _container = css`
  display: flex;
`;

const _label = css`
  color: #ffffff;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const _select = css`
  text-align: center;
  margin: 0 5px;
  width: 90px;
  background-color: #ffffff;
  font-size: 16px;
  border-radius: 3px;
  color: #555555;
  font-weight: 500;
  border: 1px solid #f1f1f1;

  ::before {
    border-bottom: none;
  } 

  ::after {
    border-bottom: none;
  } 
`;

const _classesSelect = css`
  padding: 8px 0 6px 24px;
  font-weight: 500;

  focus {
    background: none;
  }
`;

const Select = ({ label,
  name,
  value,
  disabled,
  onChange,
  loading = false,
  displayEmpty = false,
  emptyLabel = "אנא בחר",
  children,
  selectStyle,
  blackLabels = false
}) => {

  const render = loading ? <Dummy selectStyle={selectStyle} /> : <Selec
    name={name}
    className={classnames(_select, selectStyle)}
    value={value}
    disabled={disabled}
    onChange={onChange}
    classes={{ select: _classesSelect }}
    displayEmpty={displayEmpty}
  >
    {displayEmpty ? <MenuItem value={""} disabled>{emptyLabel}</MenuItem> : null}
    {children}
  </Selec>;

  return (
    <div className={_container}>
      <InputLabel className={classnames(_label, css`color: ${blackLabels ? "#555555" : "#ffffff"}`)} id="label">{label}</InputLabel>
      {render}
    </div>
  );

}

export default React.memo(Select);

const Dummy = ({ selectStyle }) => {
  return <div className={classnames(_select, selectStyle)}>
    <Spinner size={18} />
  </div>
}