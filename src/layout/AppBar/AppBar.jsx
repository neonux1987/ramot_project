import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import ControlsContainer from "./Controls/ControlsContainer";
import DraggableFrame from "../../components/DraggableFrame/DraggableFrame";
import MoreMenu from "./Controls/MoreMenu/MoreMenu";
import FrameControls from "./FrameControls/FrameControls";

const drawerWidth = 225;

const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    zIndex: 885,
    padding: "15px",
    position: "fixed",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - 25px)`,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: "25px",
  },
  hide: {
    display: "none",
  },
}));

const AppBar = ({
  onClose,
  onMaximize,
  onMinimize,
  showSidebar,
  buildingId,
  routes,
}) => {
  const classes = useStyles();

  return (
    <DraggableFrame>
      <MuiAppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          {
            [classes.appBarShift]: showSidebar,
          },
          classes.root
        )}
        id="toolbar"
      >
        <MoreMenu active={routes.active.state.buildingName === "ניהול"} />

        <ControlsContainer routes={routes} buildingId={buildingId} />

        <FrameControls
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onClose={onClose}
        />
      </MuiAppBar>
    </DraggableFrame>
  );
};

export default AppBar;
