// LIBRARIES
import React from "react";
import { MoreVert } from '@material-ui/icons';
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import classnames from 'classnames';

const MoreButton = ({ className = "", onClick, active }) => {
  return (
    <ButtonWithSound onClick={onClick} className={classnames(className, active ? "activeExpandItem" : "")}>
      <MoreVert />
    </ButtonWithSound>
  );

}

export default React.memo(MoreButton);