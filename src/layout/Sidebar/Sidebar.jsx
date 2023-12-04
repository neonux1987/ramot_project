import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import SiderBarBg from "../../assets/images/sidebar.jpg";
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
    overflow: "unset",
    marginTop: "10px",
    //zIndex: 1200,
    //position: "relative",
    marginLeft: "10px",
    marginBottom: "10px",
    borderRadius: "8px"
  },
  drawerPaper: {
    width: drawerWidth,
    //boxShadow: "2px 0px 14px 1px #00000012", //2px 0px 14px 1px #00000012
    overflow: "hidden",
    background: "none",
    position: "unset",
    //border: "1px solid #e5e5e5",
    borderRadius: "8px",
    background: `url(${SiderBarBg}) no-repeat`
  },
  divWrapper: {
    backgroundColor: "#0000009e",
    paddingTop: "10px",
    height: "100%"
  }
}));

const Sidebar = ({ routes, isFetching, data }) => {
  const classes = useStyles();

  const showSidebar = useSelector((store) => store.toggleSidebar.showSidebar);
  const { isFullscreen } = useSelector((store) => store.fullscreen);

  return (
    <Drawer
      variant="persistent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
      open={showSidebar}
      id="sidebar"
      style={{ display: isFullscreen ? "none" : "initial" }}
    >
      <div className={classes.divWrapper}>
        <Logo />
        <ControlsContainer routes={routes} />
        <FadedDivider />
        {isFetching ? (
          <CenteredLoader text="טוען תפריט" color="#000000" />
        ) : (
          <MenuContainer routes={routes} data={data} />
        )}
        <Credits />
      </div>
    </Drawer>
  );
};

export default Sidebar;
