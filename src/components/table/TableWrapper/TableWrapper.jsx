import React from 'react';
import { css } from 'emotion';

const style = css`
  margin: 0 0px 0px;
`;

// name tableElement is used for 
// scrollTo functionality
const TableWrapper = ({ children, id }) => {
  return (
    <div id={id} className={style} name="tableElement">
      {children}
    </div>
  );
}

export default TableWrapper;