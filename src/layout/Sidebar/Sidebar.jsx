import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import CenteredLoader from "../../components/AnimatedLoaders/CenteredLoader";
import FadedDivider from "../../components/CustomDivider/FadedDivider";
import ControlsContainer from "./Controls/ControlsContainer";
import Credits from "./Credits/Credits";
import Logo from "./Logo/Logo";
import MenuContainer from "./Menu/MenuContainer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 5,
    overflow: "unset",
    marginTop: "104px",
    zIndex: "1200",
    position: "relative"
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: "none",
    //boxShadow: "2px 0px 14px 1px #00000012", //2px 0px 14px 1px #00000012
    overflow: "hidden",
    background: "none",
    position: "unset"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

const Sidebar = ({ routes, isFetching, data }) => {
  const classes = useStyles();

  const showSidebar = useSelector((store) => store.toggleSidebar.showSidebar);
  const { isFullscreen } = useSelector((store) => store.fullscreen);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={showSidebar}
      classes={{
        paper: classes.drawerPaper
      }}
      id="sidebar"
      style={{ display: isFullscreen ? "none" : "initial" }}
    >
      <Logo />
      <FadedDivider />
      <ControlsContainer routes={routes} />
      <FadedDivider />
      {isFetching ? (
        <CenteredLoader text="טוען תפריט" color="#000000" />
      ) : (
        <MenuContainer routes={routes} data={data} />
      )}
      <Credits />
    </Drawer>
  );
};

export default Sidebar;
