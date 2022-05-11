import React from 'react';
import { css } from 'emotion';

const style = css`
  position: absolute;
  height: 50px;
  display: flex;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 0px;
  -webkit-app-region: drag;

  :after{
    width: 50px;
    border-top: 50px solid transparent;
    border-right: 50px solid rgb(26 187 148);
    -webkit-transform: rotateX(180deg);
    -ms-transform: rotateX(180deg);
    transform: rotateX(180deg);
    content: "";
    z-index: 887;
    position: absolute;
    -webkit-app-region: no-drag;
    top: -4px;
    right: -4px;
  }
`;

const nonClickable = css`
  border-top: 50px solid transparent;
  border-right: 50px solid transparent;
  content: "";
  z-index: 999;
  position: absolute;
  transform: skew(45deg);
  top: 0px;
  right: 25px;
  -webkit-app-region: drag;
`;

const DraggableFrame = props => {
  return <div className={style}>
    <div className={nonClickable}></div>
    {props.children}
  </div>;
}

export default React.forwardRef((props, ref) =>
  <DraggableFrame innerRef={ref} {...props} />
);
