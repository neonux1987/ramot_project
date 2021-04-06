import React from 'react';
import { css } from 'emotion';

const _table = css`
  width: 100%;
`;

const _thead = css`
  display: table-header-group;
  border-collapse: collapse;
  width: 100%;
  height: auto;
`;

const PrintRepeatableWrapper = ({ header, content }) => {

  return <table className={_table}>
    <thead className={_thead}>
      <tr>
        <th>
          {header}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{content}</td>
      </tr>
    </tbody>
  </table>;
}

export default PrintRepeatableWrapper;