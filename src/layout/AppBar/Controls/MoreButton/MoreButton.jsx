// LIBRARIES
import React from "react";
import { Icon } from '@iconify/react';
import ButtonWithSound from "../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import classnames from 'classnames';
import useIcons from "../../../../customHooks/useIcons";

const MoreButton = ({ className = "", onClick, active }) => {
  const [generateIcon] = useIcons();
  const Icon = generateIcon("more-menu");
  return (
    <ButtonWithSound onClick={onClick} className={classnames(className, active ? "activeExpandItem" : "")}>
      <Icon />
    </ButtonWithSound>
  );

}

export default React.memo(MoreButton);