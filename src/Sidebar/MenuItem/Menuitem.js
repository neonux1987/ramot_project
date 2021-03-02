// LIBRARIES
import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';

// CSS
import {
  listItem,
  listItemIcon
} from './MenuItem.module.css';
import classnames from 'classnames';
import ButtonNavLink from '../../components/buttons/ButtonNavLink';

const Menuitem = (props) => {

  const {
    label,
    Icon = <div></div>,
    active,
    to,
    style,
    className,
    classes = {},
    textClassName,
    iconClassName,
    tabIndex
  } = props;

  return (
    <ListItem
      tabIndex={tabIndex}
      component={ButtonNavLink}
      className={classnames(listItem, className, active ? "activeButton" : "")}
      classes={classes}
      style={style}
      to={to}
      selected={false}
      draggable={false}
    >
      <ListItemIcon className={classnames(listItemIcon, iconClassName)} style={{ color: active ? "#fafafa" : "#d0d0d0" }}>
        {Icon && <Icon />}
      </ListItemIcon>
      <ListItemText className={listItemIcon} classes={{ primary: textClassName }} style={{ color: active ? "#fafafa" : "#d0d0d0" }} primary={label} />
    </ListItem>
  );
};

export default Menuitem;