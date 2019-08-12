import React from 'react';
import { Toolbar, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  typography: {
    marginTop: "0.35em",
    color: "#f5f5f5",
    fontSize: "24px",
    width: "70px"
  },
  toolbarRoot: {
    paddingLeft: "16px",
    display: "initial",
    minHeight: "initial",
    padding: "0",
    paddingTop: "10px",
    paddingBottom: "12px",
    backgroundColor: "#22262E",
    marginBottom: "18px",
  }
});

const Logo = (props) => {
  return (
    <Toolbar classes={{ root: props.classes.toolbarRoot }} >
      <Typography className={props.classes.typography} variant="h4" gutterBottom>
        NDTS
        </Typography>
    </Toolbar>
  );
};

export default withStyles(styles)(Logo);