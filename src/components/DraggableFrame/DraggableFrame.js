import React from "react";
import { css } from "emotion";

const style = css`
  position: absolute;
  height: 50px;
  display: flex;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 0px;
  -webkit-app-region: drag;

  :after {
    content: "";
    z-index: 887;
    -webkit-app-region: no-drag;
    height: 100px;
    position: absolute;
    top: -52px;
    right: -60px;
    width: 100px;
    transform: rotate(40deg);
  }
`;

const DraggableFrame = (props) => {
  return <div className={style}>{props.children}</div>;
};

export default React.forwardRef((props, ref) => (
  <DraggableFrame innerRef={ref} {...props} />
));
