import React from 'react';
import { css } from 'emotion';

const style = css`
  display: flex;
  padding: 0;
  flex: 1;
  overflow: "hidden;
`

const AppWrapper = ({ children }) => <div className={style}>
  {children}
</div>

export default AppWrapper;