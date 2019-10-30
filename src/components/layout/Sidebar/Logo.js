import React from 'react';
import { Toolbar, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  typography: {
    color: "#6057ec",
    width: "70px",
    fontSize: "24px",
    fontWeight: "600",
    marginTop: "0.35em",
    fontFamily: 'Roboto',
    fontStyle: "italic",
  },
  toolbarRoot: {
    paddingLeft: "18px",
    display: "initial",
    minHeight: "initial",
    padding: "0",
    paddingTop: "10px",
    paddingBottom: "12px",
    //backgroundColor: "#22262E",
    backgroundColor: "#000c18",
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