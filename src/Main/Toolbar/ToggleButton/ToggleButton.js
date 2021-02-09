// LIBRARIES
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { toggleSidebar } from '../../../redux/actions/sidebarActions';

const ToggleButton = props => {

  const dispatch = useDispatch();
  const { showSidebar } = useSelector(store => store.sidebar)

  const icon = showSidebar ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />;

  const onClick = () => dispatch(toggleSidebar());

  return (
    <ButtonWithSound className={props.className} onClick={onClick}>
      {icon}
    </ButtonWithSound>
  );

}

export default React.memo(ToggleButton);