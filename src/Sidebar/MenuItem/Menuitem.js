// LIBRARIES
import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';

// CSS
import {
  listItem,
  listItemIcon
} from './MenuItem.module.css';
import classnames from 'classnames';
import CustomNavLink from '../../components/CustomNavLink/CustomNavLink';

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
      component={CustomNavLink}
      //button
      className={classnames(listItem, className, active ? "activeButton" : "")}
      style={style}
      to={to}
      selected={false}
    >
      <ListItemIcon className={listItemIcon}>
        {Icon && <Icon />}
      </ListItemIcon>
      <ListItemText className={listItemIcon} primary={label} />
    </ListItem>
  );
};

export default Menuitem;