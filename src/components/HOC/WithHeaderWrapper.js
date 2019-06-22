import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  headerWrapper: {
    //background: "#fff",
    //border: "1px solid #eaeaea",
    borderRadius: "4px",
    //paddingTop: "10px",
    marginBottom: "20px"
  }
});

const WithHeaderWrapper = (props) => (
  <div className={props.classes.headerWrapper}>
    {props.children}
  </div>
);


export default withStyles(styles)(WithHeaderWrapper);