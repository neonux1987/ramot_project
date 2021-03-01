// LIBRARIES
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SwitchWithSound from "../../../componentsWithSound/SwitchWithSound/SwitchWithSound";
import { toggleSidebar } from '../../../redux/actions/sidebarActions';

const style = css`
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  margin-right: 0px;
  min-width: unset;
  color: #000000;
  -webkit-app-region: no-drag;
    -webkit-user-select: none;
`;

const ToggleButton = props => {

  const dispatch = useDispatch();
  const { showSidebar } = useSelector(store => store.sidebar)

  const icon = showSidebar ? <ArrowForwardIosIcon /> : <ArrowForwardIosIcon style={{ transform: "scaleX(-1)" }} />;

  const onClick = () => dispatch(toggleSidebar());

  return (
    <SwitchWithSound
      className={style}
      checked={showSidebar}
      onChange={onClick}
      name="toggleButton"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
      color="primary"
      size="medium"

    >

    </SwitchWithSound>
  );

}

export default React.memo(ToggleButton);