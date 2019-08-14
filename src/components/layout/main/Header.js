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
    //background: "#fff",
    padding: "0 0px 6px",
    //border: "1px solid #e8e8e8",
    //boxShadow: "0px 0px 2px #0000000d"
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