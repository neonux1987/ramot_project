import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/actions/toggleSidebarActions';
import ButtonWithSound from "../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 992,
    flip: false
  },
  button: {
    borderRadius: "3px",
    outline: "none",
    cursor: "pointer",
    marginLeft: "0px",
    minWidth: "unset",
    color: "#000000",
    '-webkit-app-region': "no-drag",
    '-webkit-user-select': "none",
    padding: 0,
    zIndex: 999,
    position: "absolute",
    flip: false,
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 0 6px 2px rgb(0 0 0 / 18%)",
    height: "100px",
    top: "-52px",
    right: "-60px",
    width: "100px",
    transform: "rotate(40deg)",
    '&:hover': {
      background: "#3a94ea"
    }
  },
  iconWrapper: {
    position: "absolute",
    top: "119px",
    right: "17px",
    transform: "rotateZ(276deg)",
    width: "100%",
    flip: false
  },
  iconStyle: {
    width: "24px",
    height: "24px",
    color: "#ffffff",
    right: 0,
    top: "-8px",
    position: "absolute",
    flip: false
  }
}));

const ToggleButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);
  const { isFullscreen } = useSelector(store => store.fullscreen);
  const icon = showSidebar ? <ArrowForwardIos className={classes.iconStyle} /> : <ArrowBackIos className={classes.iconStyle} style={{ right: "-3px" }} />;

  const onClick = () => dispatch(toggleSidebar());

  return (
    <div className={classes.wrapper} id="toggleButton" style={{ display: isFullscreen ? "none" : "initial" }}>
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

}

export default React.memo(ToggleButton);