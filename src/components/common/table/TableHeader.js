import React from 'react';
import TableHeaderCol from './TableHeaderCol';
import { TableHead, TableRow, withStyles } from '@material-ui/core';

const styles = theme => ({
  row: {
    height: "34px"
  },
});

const TableHeader = (props) => {
  let headers = props.headers.map((header, index) => {
    return (<TableHeaderCol headerName={header.title} options={header.options} key={index} />);
  });

  let generalHeaders;

  if (props.generalHeaders !== undefined) {
    generalHeaders = (<TableRow className={props.classes.row}>
      {props.generalHeaders.map((header, index) => {
        return (
          <TableHeaderCol headerName={header.title} options={header.options} key={index} />
        );
      })}
    </TableRow>);
  }



  return (
    <TableHead>
      {generalHeaders}
      <TableRow className={props.classes.row}>
        {headers}
      </TableRow>
    </TableHead>
  );

}

export default withStyles(styles)(TableHeader);