import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/actions/toggleSidebarActions";
import { makeStyles } from "@material-ui/core/styles";
import SwitchWithSound from "../../componentsWithSound/SwitchWithSound/SwitchWithSound";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    "-webkit-app-region": "no-drag",
    "-webkit-user-select": "none"
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        background:
          "linear-gradient( 45deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.25) 100% ) rgb(23,110,193)",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: "#dddddd",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {},
  focusVisible: {}
}));

const ToggleButtonDefault = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSidebar = useSelector((store) => store.toggleSidebar.showSidebar);

  const onClick = () => dispatch(toggleSidebar());

  return (
    <SwitchWithSound
      checked={showSidebar}
      onChange={onClick}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
    />
  );
};

export default React.memo(ToggleButtonDefault);
