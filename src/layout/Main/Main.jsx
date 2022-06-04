import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import Routes from "./Routes";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    display: "block",
    zIndex: 990,
    position: "relative",
    marginTop: "64px",
  },
  mainShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  content: {
    height: "100%",
    width: "100%",
    overflow: "overlay",
    position: "absolute",
  },
}));

const Main = ({ mainContainerRef }) => {
  const classes = useStyles();
  const showSidebar = useSelector((store) => store.toggleSidebar.showSidebar);
  const { isFullscreen } = useSelector((store) => store.fullscreen);

  return (
    <main
      id="mainContainer"
      className={clsx(classes.main, {
        [classes.mainShift]: showSidebar,
      })}
      style={{ marginTop: isFullscreen ? "0" : "64px" }}
    >
      <div className={classes.content} ref={mainContainerRef} id="mainContent">
        <Route render={({ location }) => <Routes location={location} />} />
      </div>
    </main>
  );
};

export default Main;
