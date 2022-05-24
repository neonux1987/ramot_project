import React from 'react';
import { Minimize, CheckBoxOutlineBlank, Close } from '@material-ui/icons';
import { css } from 'emotion';

const style = css`
  display: flex;
  /* width: 100%; */
  justify-content: flex-end;
  align-items: center;
  background: rgb(23, 110, 193);
  padding: 2px 10px;
  overflow: hidden;
`;

const button = css`
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  width: 42px;
  height: 36px;
  border-radius: 0;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  color: #ffffff;

  :hover{
    background-color: rgb(255 255 255 / 20%);
  }
`;

const close = css`
  margin-left: -4px;

  :hover{
    background: red;
    color: #ffffff;
  }
`;

const icon = css`
  font-size: 18px;
`;

const maximizeIcon = css`
  font-size: 16px;
  margin-top: 0px;
`;


const FrameControls = ({ onMinimize, onMaximize, onClose }) => {

  return (
    <div className={style}>
      <button className={button} onClick={onMinimize}><Minimize className={icon} /></button>
      <button className={button} onClick={onMaximize}><CheckBoxOutlineBlank className={maximizeIcon} /></button>
      <button className={`${button} ${close}`} onClick={onClose}><Close className={icon} /></button>
    </div>
  );
}

export default FrameControls;