import React from "react";
import classnames from "classnames";
import { spinner, icon, navLink, minWidth } from "./SpinnerButton.module.css";
import ButtonNavLink from "../ButtonNavLink";

const SpinnerButton = ({ Icon, to = {}, active = false, className }) => {
  return (
    <ButtonNavLink
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
    </ButtonNavLink>
  );
};

export default SpinnerButton;
