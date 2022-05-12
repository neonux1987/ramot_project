import React from 'react';
import TableRow from './TableRow';

const GroupRow = ({ gridTemplateColumns, style, children }) => {
  return (
    <TableRow
      className="groupRow"
      style={style}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </TableRow>
  );
}

export default GroupRow;