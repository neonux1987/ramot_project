import MuiAppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import DraggableFrame from "../../components/DraggableFrame/DraggableFrame";
import ToggleButton from "../ToggleButton/ToggleButton";
import FrameControls from "./FrameControls/FrameControls";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    zIndex: 889,
    position: "sticky",
    margin: "15px 11px",
    alignItems: "center",
    padding: "0 20px",
    borderRadius: "14px",
    background: "#3774b3",
    boxShadow: "none",
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
