import React from "react";
import classnames from "classnames";
import { spinner, icon, navLink, minWidth } from "./SpinnerButton.module.css";
import ButtonNavLinkWithSound from "../../../componentsWithSound/ButtonNavLinkWithSound/ButtonNavLinkWithSound";

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
