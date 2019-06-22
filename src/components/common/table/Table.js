import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { Table as MainTable, Paper, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

const Table = (props) => {
  return (
    <Paper id={props.tableId} className={props.classes.root}>
      <MainTable className={props.classes.table}>
        <TableHeader headers={props.headers} generalHeaders={props.generalHeaders} />
        <TableBody toggleEdit={props.toggleEdit} editedId={props.editedId} editingLabel={props.editingLabel} rows={props.rows} headers={props.headers} />
      </MainTable>
    </Paper>
  );

}

export default withStyles(styles)(Table);