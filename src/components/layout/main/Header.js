import React from 'react';
import { withStyles, Typography } from '@material-ui/core';

const styles = (theme) => ({
  loadingWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    color: "#000",
    fontSize: "34px",
    margin: "0 auto"
  },
  header: {
    display: "inline-block",
    background: "#f1f1f1",
    border: "1px dotted #9c9c9c",
    padding: "0 10px 6px"
  },
  headerTitle: {
    marginBottom: "0",
    paddingBottom: "0"
  },
  headerSubTitle: {
    fontSize: "24px"
  }
});

const Header = props => {



  return (
    <div className={props.classes.header}>
      <Typography style={props.textColor} variant="h3" color="primary" classes={{ root: props.classes.headerTitle /*colorPrimary: props.textColor*/ }}>
        {props.title}
      </Typography>
    </div>
  );

}

export default withStyles(styles)(Header);