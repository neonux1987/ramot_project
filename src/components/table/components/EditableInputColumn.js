import React from 'react';
import useColumnUpdate from '../../../customHooks/useColumnUpdate';
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
`;

const inputField = css`
  padding-top: 0;
  outline-color: blue;
  border: none;
  background: none;
  text-align: center;
  height: 100%;
  width: 100%;
  font-size: 16px;

  :hover,:focus,:active{
    border: 1px solid #000;
    outline: none;
  }
`;

const EditableInputColumn = props => {
  const { value, ...newProps } = props;
  const [newValue, onChange] = useColumnUpdate(value);

  return <div className={wrapper}>
    <input
      className={inputField}
      value={newValue}
      onChange={onChange}
      {...newProps}
    />
  </div>;

};

export default React.memo(EditableInputColumn);