// LIBRARIES
import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

// CSS
import {
  listItem,
  listItemIcon
} from './MenuItem.module.css';
import classnames from 'classnames';

const Menuitem = (props) => {

  const {
    label,
    Icon = <div></div>,
    active,
    to,
    style,
    className
  } = props;

  return (
    <ListItem
      component={NavLink}
      button
      className={classnames(listItem, className, active ? "activeButton" : "")}
      style={style}
      to={to}
    >
      <ListItemIcon className={listItemIcon}>
        {Icon && <Icon />}
      </ListItemIcon>
      <ListItemText className={listItemIcon} primary={label} />
    </ListItem>
  );
};

export default Menuitem;