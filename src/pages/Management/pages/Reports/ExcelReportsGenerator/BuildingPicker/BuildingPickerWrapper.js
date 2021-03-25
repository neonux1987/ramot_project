// LIBRARIES
import React from 'react';
import { css } from 'emotion';

const _container = css`
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 30px 0 0;
`;

const BuildingPickerWrapper = ({ children }) => {

  return <div className={_container}>
    {children}
  </div>;
}

export default React.memo(BuildingPickerWrapper);