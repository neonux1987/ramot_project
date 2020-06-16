import React from 'react';
import { css } from 'emotion';
import { ListItem, ListItemIcon, Collapse, List } from '@material-ui/core';
import { Replay, Backup } from '@material-ui/icons';

const nested = css`
  padding-right: 32px;
  font-size: 16px;
`;
const listIcon = css`
  min-width: 32px;
  color: #0365a2;
`;

export default ({ open, restartAppHandler }) => {
  return <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>

      <ListItem button className={nested} onClick={restartAppHandler}>
        <ListItemIcon className={listIcon}>
          <Replay />
        </ListItemIcon>
        אתחל אפליקציה
      </ListItem>

      <ListItem button className={nested} onClick={() => alert("בקרוב")}>
        <ListItemIcon className={listIcon}>
          <Backup />
        </ListItemIcon>
        גבה בסיס נתונים
      </ListItem>

    </List>
  </Collapse>;
};