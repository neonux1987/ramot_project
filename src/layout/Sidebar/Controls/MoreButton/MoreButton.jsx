// LIBRARIES
import React from "react";
import ButtonWithSound from "../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import classnames from "classnames";
import MenuIcon from "../../../../components/Icons/MenuIcon";

const MoreButton = ({ className = "", onClick, active }) => {
  return (
    <ButtonWithSound
      onClick={onClick}
      className={classnames(className, active ? "activeExpandItem" : "")}
    >
      <MenuIcon />
    </ButtonWithSound>
  );
};

export default React.memo(MoreButton);
