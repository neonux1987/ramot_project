import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import PageHeaderContainer from "./PageHeader/PageHeaderContainer";
import Routes from "./Routes";

const drawerWidth = 255;

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    display: "block",
    zIndex: 990,
    position: "relative",
    marginTop: "89px",
    paddingTop: "15px"
  },
  mainShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  content: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    position: "absolute"
  }
}));

const Main = ({ mainContainerRef }) => {
  const classes = useStyles();
  const showSidebar = useSelector((store) => store.toggleSidebar.showSidebar);
  const { isFullscreen } = useSelector((store) => store.fullscreen);

  return (
    <main
      id="mainContainer"
      className={clsx(classes.main, {
        [classes.mainShift]: showSidebar
      })}
      style={{ marginTop: isFullscreen ? "0" : "89px" }}
    >
      <div className={classes.content} ref={mainContainerRef} id="mainContent">
        <PageHeaderContainer />
        <Route render={({ location }) => <Routes location={location} />} />
      </div>
    </main>
  );
};

export default Main;
