import React from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  loadingWrapperOld: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    color: "#000",
    fontSize: "34px",
    margin: "0 auto"
  },
  loadingWrapper: {
    position: "absolute",
    display: "block",
    textAlign: "center",
    width: "100%",
    top: "50%",
    left: "0",
    color: "#000",
    fontSize: "34px",
    zIndex: "4",
    "-webkit-transform": "translateY(-52%)",
    transform: "translateY(-52%)",
    transition: "all .3s cubic-bezier(.25,.46,.45,.94)"
  },
  loadingText: {
    color: "#353535",
    fontSize: "34px"
  },
  circleStyle: {
    color: '#353535'
  }
});

const LoadingCricle = (props) => {
  return (
    props.loading ? <div className={props.wrapperStyle ? props.wrapperStyle : props.classes.loadingWrapper}>
      <div style={{
        background: "rgb(255, 255, 255)",
        padding: "20px",
        margin: "0px auto",
        width: "110px",
        boxShadow: "0px 0px 2px #00000026"
      }}>
        {/* <span className={props.textStyle ? props.textStyle : props.classes.loadingText}>טוען... </span> */}
        <CircularProgress className={props.classes.circleStyle} />
      </div>
    </div > : null
  );
};

export default withStyles(styles)(LoadingCricle);
