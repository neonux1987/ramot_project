import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import classnames from "classnames";
import React, { Fragment } from "react";

import RotatingExpandLessIcon from "../../../../components/Icons/RotatingExpandLessIcon";
import useBuildingColor from "../../../../customHooks/useBuildingColor";
import {
  collapse,
  listItem,
  listItemIcon,
  listItemText
} from "./ExpandableMenuItem.module.css";

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
        <RotatingExpandLessIcon style={{ color: "#e5e5e5" }} open={open} />
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
