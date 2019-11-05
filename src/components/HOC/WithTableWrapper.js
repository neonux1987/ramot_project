import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  tableWrapper: {
    padding: "30px 20px",
    background: "#fff",
    borderRadius: "4px"
  }
});

const WithTableWrapper = (props) => (
  <div className={props.classes.tableWrapper}>
    {props.children}
  </div>
);


export default withStyles(styles)(WithTableWrapper);