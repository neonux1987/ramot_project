import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Fragment } from 'react';
import classnames from 'classnames';

import {
  listItemIcon,
  listItemText,
  expandIcon,
  collapse,
  listItem
} from './ExpandableMenuItem.module.css';

export default props => {

  const {
    Icon = <div></div>,
    label = "",
    open = false,
    onClick,
    children,
    active = false
  } = props

  return (
    <Fragment>

      <ListItem
        //button
        onClick={onClick}
        className={classnames(listItem, active ? "activeExpandItem" : "")}
      >
        <ListItemIcon className={listItemIcon}>
          {Icon && <Icon />}
        </ListItemIcon>
        <ListItemText className={listItemText} primary={label} />
        {open ? <ExpandLess className={expandIcon} /> : <ExpandMore className={expandIcon} />}
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
}