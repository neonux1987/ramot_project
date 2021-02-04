// LIBRARIES
import React from "react";
import { MenuOpen as MenuIcon } from '@material-ui/icons';
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";

const VolumeButton = props => {
  const { className = "", onClick } = props;
  return (
    <ButtonWithSound className={className} onClick={onClick}>
      <MenuIcon style={{ display: "flex" }} />
    </ButtonWithSound>
  );

}

export default React.memo(VolumeButton);