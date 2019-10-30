import React from 'react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Button, withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    backgroundColor: "#000c18",
    border: "1px solid #6057ec",
    "&:hover": {
      background: "#f1f1f1"
    },
    padding: "2px",
    minWidth: "initial",
    position: "absolute",
    zIndex: 1201,
    //top: "20px",
    top: "17px",
    left: "196px"
  },
  keyboardArrowRoot: {
    color: "#6057ec"
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