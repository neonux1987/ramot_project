import React from 'react';
import classnames from 'classnames';
import { Minimize, CheckBoxOutlineBlank, Close } from '@material-ui/icons';
import { css } from 'emotion';

const style = css`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const button = css`
  border: none;
  background: none;
  margin-right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  margin-left: 4px;
  width: 40px;
  height: 36px;
  border-radius: 0;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;

  :hover{
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const close = css`
  margin-left: 0;
`;

const icon = css`
  font-size: 20px;
`;

const minimizeIcon = css`
  margin-bottom: 3px;
`;

const maximizeIcon = css`
  font-size: 18px;
  margin-top: 0px;
`;

const FrameControls = ({ onMinimize, onMaximize, onClose }) => {

  return (
    <div className={style}>
      <button className={button} onClick={onMinimize}><Minimize className={icon} /></button>
      <button className={button} onClick={onMaximize}><CheckBoxOutlineBlank className={maximizeIcon} /></button>
      <button className={classnames(button, close)} onClick={onClose}><Close className={icon} /></button>
    </div>
  );
}

export default FrameControls;