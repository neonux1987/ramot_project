import React from 'react';
import { withStyles, Typography } from '@material-ui/core';

const styles = (theme) => ({

  header: {
    borderRadius: "4px",
    marginBottom: "20px",
    borderBottom: "1px dashed #ccc",
    display: "flex",
    alignItems: "center",
    paddingBottom: "10px"
  }
});

const Header = props => {

  return (
    <div className={props.classes.header}>
      <Typography style={props.style} variant="h4" color="primary">
        {props.title}
      </Typography>
    </div>
  );

}

export default withStyles(styles)(Header);