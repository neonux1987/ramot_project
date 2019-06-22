import React from 'react';
import TableBodyRow from './TableBodyRow';
import { TableBody as TableBodyMain } from '@material-ui/core';

const TableBody = (props) => {

  let rows = props.rows.map((rowData, index) => {
    return (<TableBodyRow toggleEdit={props.toggleEdit} editedId={props.editedId} editingLabel={props.editingLabel} options={props.options} data={rowData} key={index} headers={props.headers} />);
  })

  return (
    <TableBodyMain>
      {rows}
    </TableBodyMain>
  );

}

export default TableBody;