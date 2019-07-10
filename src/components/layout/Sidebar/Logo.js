import React from 'react';
import { Toolbar, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  typography: {
    marginTop: "0.35em",
    color: "#f5f5f5",
    fontSize: "20px",
    //width: "125px"
  },
  toolbarRoot: {
    paddingLeft: "16px",
    display: "initial",
    minHeight: "initial",
    padding: "0",
    paddingTop: "16px",
    paddingBottom: "4px",
    //backgroundColor: "#1fc8db",
    //backgroundImage: "linear-gradient(141deg, #21bd99 0%, #14659e 75%)",
    marginBottom: "18px"
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