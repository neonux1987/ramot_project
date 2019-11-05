import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  headerWrapper: {
    borderRadius: "4px",
    marginBottom: "30px",
    borderBottom: "1px dashed #ccc",
    display: "flex",
    alignItems: "center",
    paddingBottom: "10px"
  }
});

const WithTableControlsWrapper = (props) => (
  <div className={props.classes.headerWrapper}>
    {props.children}
  </div>
);


export default withStyles(styles)(WithTableControlsWrapper);