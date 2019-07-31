import React from 'react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Button, withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    background: "#f5f5f5",
    //border: "1px solid #000",
    "&:hover": {
      background: "#f1f1f1"
    },
    padding: "2px",
    minWidth: "initial",
    position: "absolute",
    zIndex: 1201,
    //top: "20px",
    top: "17px",
    left: "196px",
    boxShadow: "0px 0px 2px #868383"
  },
  keyboardArrowRoot: {
    color: "#167db9"
  }
});

const SidebarToggleButton = (props) => {
  return (
    <Button className={props.classes.button + props.toggleStyle} onClick={props.toggleSidebar} >
      <KeyboardArrowRight className={props.classes.keyboardArrowRoot} />
    </Button>
  );
}

export default withStyles(styles)(SidebarToggleButton);