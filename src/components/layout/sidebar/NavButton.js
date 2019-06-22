import React from 'react';
import { ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  navLinkHome: {
    display: "block",
    marginBottom: "10px",
    borderRadius: "4px",
    width: "219px"
  },
  listItemTextRoot: {
    padding: 0
  },
  listItemText: {
    fontSize: "16px",
    color: "#f5f5f5"
  },
  icon: {
    fontSize: "16px",
    color: "#5975ff"
  },
  listItemIcon: {
    fontSize: "16px",
    color: "#fff"
  },
  listItem: {
    '&:hover': {

    }
  }
})

const NavButton = (props) => {

  let active = props.active ? props.activeClass : "";

  return (
    <NavLink className={props.classes.navLinkHome + " " + active} to={{
      pathname: "/" + props.path,
      state: {
        label: props.label,
        parentLabel: props.parentLabel,
        engLabel: props.engLabel
      }
    }} exact>
      <ListItem classes={{ root: props.classes.listItem }} onClick={props.clicked} button>
        <ListItemIcon classes={{ root: props.classes.listItemIcon }} children={props.children} />
        <ListItemText classes={{ root: props.classes.listItemTextRoot, primary: props.classes.listItemText }} primary={props.label} />
      </ListItem>
    </NavLink>
  );
}

export default withStyles(styles)(NavButton);