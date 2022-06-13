import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import DraggableFrame from "../../components/DraggableFrame/DraggableFrame";
import FrameControls from "./FrameControls/FrameControls";
import ToggleButtonDefault from "../ToggleButton/ToggleButtonDefault";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    zIndex: 885,
    padding: "10px 10px 0",
    position: "fixed",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    width: `calc(100% - 0px)`,
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

const AppBar = ({ onClose, onMaximize, onMinimize, showSidebar }) => {
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
        <ToggleButtonDefault />
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
