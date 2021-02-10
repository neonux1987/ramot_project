// LIBRARIES
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SwitchWithSound from "../../../componentsWithSound/SwitchWithSound/SwitchWithSound";
import { toggleSidebar } from '../../../redux/actions/sidebarActions';
import { Switch } from "@material-ui/core";

const ToggleButton = props => {

  const dispatch = useDispatch();
  const { showSidebar } = useSelector(store => store.sidebar)

  const icon = showSidebar ? <ArrowForwardIosIcon /> : <ArrowForwardIosIcon style={{ transform: "scaleX(-1)" }} />;

  const onClick = () => dispatch(toggleSidebar());

  return (
    <SwitchWithSound
      className={props.className}
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