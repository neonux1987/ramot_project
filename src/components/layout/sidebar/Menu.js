import React from 'react';
import Menuitem from "./Menuitem";
import { List, withStyles } from '@material-ui/core';

const styles = theme => ({
  ListRoot: {
    overflow: "inherit",
    borderRadius: "4px",
    overflowX: "hidden",
    overflowY: "auto",
    marginBottom: "132px"
  },
  menuContainer: {
    width: "219px",
  },
  listItemTextRoot: {
    padding: 0
  },
  listItemText: {
    fontSize: "16px",
    color: "#f5f5f5"
  },
  listItemIcon: {
    fontSize: "16px",
    color: "#5975ff"
  },
  listItem: {
    '&:hover': {

    }
  },
  buildingsTitle: {
    color: "#f5f5f5",
    display: "flex",
    marginLeft: "16px",
    marginBottom: "10px"
  },
  navLink: {
    display: "block",
    marginBottom: "10px"
  },
  active: {
    backgroundColor: "#2f75b1"
  }
})

const Menu = (props) => {

  let menuItems = props.menu.map((item, index) => {
    return (<Menuitem item={item} key={index} active={props.active} clicked={props.clicked} expandClick={props.expandClick} />)
  });

  return (
    <List classes={{ root: props.classes.ListRoot }} className={props.classes.menu}>
      <div className={props.classes.menuContainer}>
        {menuItems}
      </div>
    </List>
  );

};

export default withStyles(styles)(Menu);