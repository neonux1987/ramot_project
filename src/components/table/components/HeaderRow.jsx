import React from 'react';
import TableRow from './TableRow';

const HeaderRow = ({ gridTemplateColumns, style, children }) => {
  return (
    <TableRow
      className="headerRow"
      style={style}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </TableRow>
  );
}

export default HeaderRow;