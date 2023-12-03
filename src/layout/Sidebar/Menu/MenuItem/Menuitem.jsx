// LIBRARIES
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import ButtonNavLink from "../../../../components/buttons/ButtonNavLink";
import { listItem, listItemIcon } from "./MenuItem.module.css";

const Menuitem = (props) => {
  const {
    label,
    Icon = <div></div>,
    active,
    to,
    className,
    tabIndex,
    labelClassName = ""
  } = props;

  return (
    <ListItem
      tabIndex={tabIndex}
      component={ButtonNavLink}
      className={classnames(listItem, className)}
      activeClassName={active ? "activeButton" : ""}
      to={to}
      selected={false}
      draggable={false}
    >
      <ListItemIcon
        className={listItemIcon}
        style={{ color: active ? "#e5e5e5" : "#e5e5e5" }}
      >
        {Icon && <Icon />}
      </ListItemIcon>
      <ListItemText
        className={listItemIcon}
        style={{ color: active ? "#e5e5e5" : "#e5e5e5" }}
        primaryTypographyProps={{ className: labelClassName }}
        primary={label}
      />
    </ListItem>
  );
};

export default Menuitem;
