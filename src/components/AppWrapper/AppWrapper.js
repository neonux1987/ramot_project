import React from 'react';
import { css } from 'emotion';

const style = css`
  display: flex;
  padding: 0;
  flex: 1;
  overflow: hidden;
  position: relative;
  z-index: 886;
`

const AppWrapper = ({ children }) => <div className={style} id="appWrapper">
  {children}
</div>

export default AppWrapper;