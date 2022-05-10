// LIBRARIES
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

import { toggleSidebar } from '../../../redux/actions/toggleSidebarActions';
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";

const _wrapper = css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 888;
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
  /* box-shadow: 0 14px 26px -12px rgb(153 153 153 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(153 153 153 / 20%); */
  /* background: #ffffff; */
  /* border-radius: 30px; */
  padding: 0;
  z-index: 888;
  position: absolute;
  width: 50px;
  height: 50px;

  :hover{
    background: none;
  }

  :before{
    border-top: 50px solid transparent;
    border-right: 50px solid rgb(26 187 148);
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
  right: -6px;
  position: relative;
  top: -5px;
`;

const nonClickable = css`
  border-top: 50px solid transparent;
  border-right: 50px solid transparent;
  content: "";
  z-index: 999;
  position: absolute;
  transform: skew(45deg);
  top: 0px;
  right: 25px;
`;

const ToggleButton = () => {

  const dispatch = useDispatch();
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  const icon = showSidebar ? <ArrowForwardIos className={iconStyle} /> : <ArrowBackIos className={iconStyle} style={{ right: "-11px" }} />;

  const onClick = () => dispatch(toggleSidebar());

  return (
    <div className={_wrapper}>
      <ButtonWithSound
        className={_button}
        checked={showSidebar}
        onClick={onClick}
        name="toggleButton"
        color="primary"
        size="medium"
      >
        <div className={iconStyle}>{icon}</div>

      </ButtonWithSound>
      <div className={nonClickable}></div>
    </div>
  );

}

export default React.memo(ToggleButton);