import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/actions/toggleSidebarActions";
import ButtonWithSound from "../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 992,
    flip: false,
  },
  button: {
    background:
      "linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%) rgb(23, 110, 193)",
    borderRadius: "3px",
    outline: "none",
    cursor: "pointer",
    marginLeft: "0px",
    minWidth: "unset",
    color: "#000000",
    "-webkit-app-region": "no-drag",
    "-webkit-user-select": "none",
    padding: 0,
    zIndex: 999,
    position: "absolute",
    flip: false,
    /* backgroundColor: theme.palette.primary.main, */
    boxShadow:
      "rgba(0, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
    height: "100px",
    top: "-52px",
    right: "-60px",
    width: "100px",
    transform: "rotate(39deg)",
    "&:hover": {
      background:
        "linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%) rgb(23, 110, 193)",
    },
  },
  iconWrapper: {
    position: "absolute",
    top: "116px",
    right: "16px",
    transform: "rotateZ(276deg)",
    width: "100%",
    flip: false,
  },
  iconStyle: {
    width: "32px",
    height: "32px",
    color: "#ffffff",
    right: "-3px",
    top: "-13px",
    position: "absolute",
    flip: false,
  },
}));

const ToggleButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSidebar = useSelector((store) => store.toggleSidebar.showSidebar);
  const { isFullscreen } = useSelector((store) => store.fullscreen);
  const icon = showSidebar ? (
    <ArrowForwardIos className={classes.iconStyle} />
  ) : (
    <ArrowBackIos className={classes.iconStyle} style={{ right: "-6px" }} />
  );

  const onClick = () => dispatch(toggleSidebar());

  return (
    <div
      className={classes.wrapper}
      id="toggleButton"
      style={{ display: isFullscreen ? "none" : "initial" }}
    >
      <ButtonWithSound
        className={classes.button}
        checked={showSidebar}
        onClick={onClick}
        name="toggleButton"
        color="primary"
        size="medium"
      >
        <div className={classes.iconWrapper}>{icon}</div>
      </ButtonWithSound>
    </div>
  );
};

export default React.memo(ToggleButton);
