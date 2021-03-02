// LIBRARIES
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

import { toggleSidebar } from '../../../redux/actions/sidebarActions';
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { MoreVert, ViewList } from "@material-ui/icons";

const style = css`
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  margin-right: 0px;
  min-width: unset;
  color: #000000;
  -webkit-app-region: no-drag;
    -webkit-user-select: none;
    box-shadow: 0 14px 26px -12px rgb(153 153 153 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(153 153 153 / 20%);
    background: #ffffff;
    border-radius: 30px;
    width: 40px;
    height: 40px;
`;

const iconStyle = css`
  width: 18px;
  height: 18px;
  color: #999999;
`;

const ToggleButton = props => {

  const dispatch = useDispatch();
  const { showSidebar } = useSelector(store => store.sidebar)

  const icon = showSidebar ? <MoreVert className={iconStyle} /> : <ViewList className={iconStyle} style={{ transform: "scaleX(-1)" }} />;

  const onClick = () => dispatch(toggleSidebar());

  return (
    <ButtonWithSound
      className={style}
      checked={showSidebar}
      onClick={onClick}
      name="toggleButton"
      color="primary"
      size="medium"
    >
      {icon}
    </ButtonWithSound>
  );

}

export default React.memo(ToggleButton);