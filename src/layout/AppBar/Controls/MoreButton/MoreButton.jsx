// LIBRARIES
import React from "react";
import { Icon } from '@iconify/react';
import ButtonWithSound from "../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import classnames from 'classnames';

const MoreButton = ({ className = "", onClick, active }) => {
  return (
    <ButtonWithSound onClick={onClick} className={classnames(className, active ? "activeExpandItem" : "")}>
      <Icon icon="ci:menu-alt-05" width="24" height="24" />
    </ButtonWithSound>
  );

}

export default React.memo(MoreButton);