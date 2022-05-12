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
    left: 0,
    zIndex: 991
  },
  button: {
    borderRadius: "3px",
    outline: "none",
    cursor: "pointer",
    marginRight: "0px",
    minWidth: "unset",
    color: "#000000",
    '-webkit-app-region': "no-drag",
    '-webkit-user-select': "none",
    padding: 0,
    zIndex: 888,
    position: "absolute",
    width: "60px",
    height: "50px",
    '&:hover': {
      background: "none"
    },
    '&:before': {
      borderTop: "50px solid transparent",
      borderLeft: "60px solid rgb(42 127 214)",
      transform: "rotateX(180deg)",
      content: '""',
      zIndex: 887,
      position: "absolute",
    }
  },
  iconWrapper: {
    transform: `rotate(314deg)`,
    zIndex: "999",
    position: "relative"
  },
  iconStyle: {
    width: "24px",
    height: "24px",
    color: "#f1f1f1",
    left: "-16px",
    top: "-8px",
  },
  nonClickable: {
    borderTop: "50px solid transparent",
    borderLeft: "60px solid transparent",
    content: "",
    zIndex: "999",
    position: "absolute",
    transform: "skew(50deg)",
    top: "0px",
    left: "30px",
  }
}));

const _wrapper = css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 991;
`;

const _button = css`
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  margin-right: 0px;
  min-width: unset;
  color: #000000;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  padding: 0;
  z-index: 888;
  position: absolute;
  width: 60px;
  height: 50px;

  :hover{
    background: none;
  }

  :before{
    border-top: 50px solid transparent;
    border-right: 60px solid rgb(42 127 214);
    transform: rotateX(180deg);
    content: "";
    z-index: 887;
    position: absolute;
  }
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  color: #f1f1f1;
  z-index: 999;
  right: -8px;
  position: relative;
  top: -4px;
  transform: rotate(338deg);
`;

const nonClickable = css`
  border-top: 50px solid transparent;
  border-right: 60px solid transparent;
  content: "";
  z-index: 999;
  position: absolute;
  transform: skew(50deg);
  top: 0px;
  right: 30px;
`;

const ToggleButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  const icon = showSidebar ? <ArrowForwardIos className={classes.iconStyle} /> : <ArrowBackIos className={classes.iconStyle} style={{ right: "-11px" }} />;

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