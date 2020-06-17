// LIBRARIES
import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';

// CSS
import {
  listItem,
  listItemIcon
} from './MenuItem.module.css';
import classnames from 'classnames';
import ButtonNavLink from '../../components/ButtonNavLink/ButtonNavLink';

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
      component={ButtonNavLink}
      className={classnames(listItem, className, active ? "activeButton" : "")}
      style={style}
      to={to}
      selected={false}
      draggable={false}
    >
      <ListItemIcon className={listItemIcon}>
        {Icon && <Icon />}
      </ListItemIcon>
      <ListItemText className={listItemIcon} primary={label} />
    </ListItem>
  );
};

export default Menuitem;