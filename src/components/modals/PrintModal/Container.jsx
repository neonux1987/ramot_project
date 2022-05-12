import React from 'react';
import { css } from 'emotion';

const container = css`
  overflow: hidden;
  z-index: 999;
  width: initial;
  margin:50px 41px 41px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  background: #fff;
  border-radius: 3px;
  outline: none;
  -webkit-app-region: no-drag;
  display: flex;
`;

const Container = React.forwardRef((props, ref) => {
  return <div ref={ref} {...props} className={container}>{props.children}</div>;
});

export default Container;