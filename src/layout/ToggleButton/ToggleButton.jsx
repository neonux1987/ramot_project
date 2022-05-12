import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';
import { toggleSidebar } from '../../redux/actions/toggleSidebarActions';
import ButtonWithSound from "../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 991,
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
    zIndex: 888,
    position: "absolute",
    width: "60px",
    height: "50px",
    flip: false,
    '&:hover': {
      background: "none"
    },
    '&:before': {
      borderTop: "50px solid transparent",
      borderRight: `60px solid ${theme.palette.primary.main}`,
      transform: "rotateX(180deg)",
      content: '""',
      zIndex: 887,
      position: "absolute",
      flip: false
    }
  },
  iconWrapper: {
    transform: `rotate(314deg)`,
    zIndex: "999",
    position: "absolute",
    top: "4px",
    right: "10px",
    flip: false
  },
  iconStyle: {
    width: "24px",
    height: "24px",
    color: "#f1f1f1",
    right: 0,
    top: "-8px",
    position: "absolute",
    flip: false
  },
  nonClickable: {
    borderTop: "50px solid transparent",
    borderRight: "60px solid transparent",
    content: "",
    zIndex: "999",
    position: "absolute",
    transform: "skew(50deg)",
    top: "0px",
    left: "30px",
    flip: false
  }
}));

const ToggleButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  const icon = showSidebar ? <ArrowForwardIos className={classes.iconStyle} /> : <ArrowBackIos className={classes.iconStyle} style={{ right: "-3px" }} />;

  const onClick = () => dispatch(toggleSidebar());

  return (
    <div className={classes.wrapper}>
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
      <div className={classes.nonClickable}></div>
    </div>
  );

}

export default React.memo(ToggleButton);