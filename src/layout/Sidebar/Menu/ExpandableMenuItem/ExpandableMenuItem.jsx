import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Fragment } from "react";
import classnames from "classnames";

import {
  listItemIcon,
  listItemText,
  collapse,
  listItem
} from "./ExpandableMenuItem.module.css";
import useBuildingColor from "../../../../customHooks/useBuildingColor";
import RotatingExpandLessIcon from "../../../../components/Icons/RotatingExpandLessIcon";

const ExpandableMenuItem = (props) => {
  const {
    Icon = null,
    label = "",
    open = false,
    onClick,
    children,
    active = false,
    buildingId
  } = props;

  const [buildingColor] = useBuildingColor(buildingId);
  //console.log(buildingColor);
  return (
    <Fragment>
      <ListItem
        onClick={onClick}
        className={classnames(listItem, active ? "activeExpandItem" : "")}
        button
      >
        <ListItemIcon className={listItemIcon}>
          {Icon && <Icon color={buildingColor} />}
        </ListItemIcon>
        <ListItemText className={listItemText} primary={label} />
        <RotatingExpandLessIcon open={open} />
      </ListItem>

      <Collapse
        classes={{ wrapperInner: collapse }}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default ExpandableMenuItem;
