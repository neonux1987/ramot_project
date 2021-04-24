import React from 'react';
import Row from './Row';
import TableRow from './TableCell/TableRow';

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