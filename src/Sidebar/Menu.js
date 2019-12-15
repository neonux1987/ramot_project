import React from 'react';
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
    width: "240px"
  }
})

const Menu = ({ children, classes }) => {

  return (
    <List classes={{ root: classes.ListRoot }}>
      <div className={classes.menuContainer}>
        {children}
      </div>
    </List>
  );

};

export default withStyles(styles)(Menu);