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
    className,
    tabIndex
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
      <ListItemIcon className={listItemIcon} style={{ color: active ? "#fafafa" : "#000000" }}>
        {Icon && <Icon />}
      </ListItemIcon>
      <ListItemText className={listItemIcon} style={{ color: active ? "#fafafa" : "#000000" }} primary={label} />
    </ListItem>
  );
};

export default Menuitem;