import React from 'react';
import { Toolbar, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  typography: {
    marginTop: "0.35em",
    color: "#f5f5f5",
    fontSize: "24px",
    borderRight: "2px solid #167db9",
    width: "70px"
  },
  toolbarRoot: {
    paddingLeft: "16px",
    display: "initial",
    minHeight: "initial",
    padding: "0",
    paddingTop: "10px",
    paddingBottom: "12px",
    //backgroundColor: "#1fc8db",
    //backgroundImage: "linear-gradient(141deg, #21bd99 0%, #14659e 75%)",
    marginBottom: "18px",
    boxShadow: "inset 0px -1px 1px #050606",
    borderBottom: "1px solid #262b2f",
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