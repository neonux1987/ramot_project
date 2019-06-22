import React from 'react';
import CustomTableCell from './CustomTableCell'

const TableHeaderCol = (props) => {
  return (
    <CustomTableCell alternativeHead={false} options={props.options}>{props.headerName}</CustomTableCell>
  );

}

export default TableHeaderCol;