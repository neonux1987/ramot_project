import React from 'react';
import CustomTableCell from './CustomTableCell'
import { TableRow, withStyles } from '@material-ui/core';

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    height: "30px"
  }
});

const TableBodyRow = (props) => {
  let render = props.headers.map((header, index) => {
    return <CustomTableCell toggleEdit={props.toggleEdit} editedId={props.editedId} itemId={props.data["id"]} editingLabel={props.editingLabel} itemName={header.accessor.includes("budget") ? header.accessor : ""} colored={header.coloredCell} edited={header.edited} styles={header.coloredCell ? header.styles : undefined} key={index}>{props.data[header.accessor] === 0 || props.data[header.accessor] === null ? "" : props.data[header.accessor]}</CustomTableCell>
  })

  return (
    <TableRow className={props.classes.row} key={props.data.id}>
      {render}
    </TableRow>
  );

}

export default withStyles(styles)(TableBodyRow);