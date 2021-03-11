import React from 'react';
import { Select as Selec, InputLabel } from '@material-ui/core';
import { css } from 'emotion';
import Spinner from '../Spinner/Spinner';

const _container = css`
  display: flex;
`;

const _label = css`
  color: #000000;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: 400;
`;

const _select = css`
  text-align: center;
  margin: 0 5px;
  width: 100px;
  background-color: #ffffff;
  font-size: 15px;
  border-radius: 3px;
  color: #000000;
  font-weight: 400;
  border: 1px solid #efecec;

  ::before {
    border-bottom: none;
    border-width: 1px;
  } 
`;

const _classesSelect = css`
  padding: 8px 0 6px 24px;
  font-weight: 400;

  focus {
    background: none;
  }
`;

const Select = ({ label, name, value, disabled, onChange, loading, children }) => {

  const render = loading ? <Dummy /> : <Selec
    name={name}
    className={_select}
    value={value}
    disabled={disabled}
    onChange={onChange}
    classes={{ select: _classesSelect }}
  >
    {children}
  </Selec>;

  return (
    <div className={_container}>
      <InputLabel className={_label} id="label">{label}</InputLabel>
      {render}
    </div>
  );

}

export default React.memo(Select);

const Dummy = () => {
  return <div className={_select}>
    <Spinner size={18} />
  </div>
}