import { Box } from "@material-ui/core";
import MuiAppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import DraggableFrame from "../../components/DraggableFrame/DraggableFrame";
import Logo from "../Sidebar/Logo/Logo";
import ToggleButton from "../ToggleButton/ToggleButton";
import FrameControls from "./FrameControls/FrameControls";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    zIndex: 889,
    position: "sticky",
    margin: "15px 11px",
    border: "1px solid #dddddd",
    alignItems: "center",
    padding: "0 20px",
    borderRadius: "14px",
    background: "#3774b3",
    boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
    height: "70px",
    flexGrow: "1",
    width: "unset"
  },
  menuButton: {
    marginRight: "25px"
  }
}));

const AppBar = ({ onClose, onMaximize, onMinimize, showSidebar }) => {
  const classes = useStyles();

  return (
    <DraggableFrame>
      <MuiAppBar className={classes.root} id="toolbar">
        <Logo />
        <ToggleButton />
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
