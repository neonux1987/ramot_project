import React from 'react';
import { Toolbar, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  typography: {
    marginTop: "0.35em",
    color: "#f5f5f5",
    fontSize: "20px"
  },
  toolbarRoot: {
    //background: "#394ba5",
    width: "160px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    //textAlign: "center",
    paddingLeft: "16px",
    display: "initial",
    minHeight: "initial",
    padding: "0",
    paddingTop: "20px",
    paddingBottom: "10px"
  }
});

const Logo = (props) => {
  return (
    <Toolbar classes={{ root: props.classes.toolbarRoot }} >
      <Typography className={props.classes.typography} variant="h4" gutterBottom>
        NDT SOLUTIONS
        </Typography>
    </Toolbar>
  );
};

export default withStyles(styles)(Logo);