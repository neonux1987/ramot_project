import React from "react";
import { css } from "emotion";
import useIcons from "../../../customHooks/useIcons";

const style = css`
  display: flex;
  /* width: 100%; */
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  flex-grow: 1;
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
  color: #000000;

  :hover {
    background-color: rgb(255 255 255 / 20%);
  }
`;

const close = css`
  :hover {
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
  const [generateIcon] = useIcons();
  const CloseIcon = generateIcon("close");
  const MaximizeIcon = generateIcon("maximize");
  const MinimizeIcon = generateIcon("minimize");
  return (
    <div className={style}>
      <button className={button} onClick={onMinimize}>
        <MinimizeIcon className={icon} />
      </button>
      <button className={button} onClick={onMaximize}>
        <MaximizeIcon className={maximizeIcon} />
      </button>
      <button className={`${button} ${close}`} onClick={onClose}>
        <CloseIcon className={icon} />
      </button>
    </div>
  );
};

export default FrameControls;
