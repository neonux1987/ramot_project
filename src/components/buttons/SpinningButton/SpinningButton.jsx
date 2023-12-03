import classnames from "classnames";
import React from "react";
import ButtonNavLinkWithSound from "../../../componentsWithSound/ButtonNavLinkWithSound/ButtonNavLinkWithSound";
import { icon, minWidth, navLink, spinner } from "./SpinnerButton.module.css";

const SpinnerButton = ({ Icon, to = {}, active = false, className }) => {
  return (
    <ButtonNavLinkWithSound
      className={classnames(
        className,
        navLink,
        minWidth,
        active ? "activeControl" : ""
      )}
      to={to}
      draggable={false}
    >
      <Icon className={classnames(icon, spinner)} />
    </ButtonNavLinkWithSound>
  );
};

export default SpinnerButton;
