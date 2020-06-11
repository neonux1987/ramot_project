// LIBRARIES
import React from "react";
import { MoreVert } from '@material-ui/icons';
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";

const MoreButton = ({ className = "", onClick }) => {
  return (
    <ButtonWithSound onClick={onClick} className={className}>
      <MoreVert />
    </ButtonWithSound>
  );

}

export default React.memo(MoreButton);