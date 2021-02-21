import React from 'react';
import { css } from 'emotion';
import { ListItem, ListItemIcon, Collapse, List, SvgIcon } from '@material-ui/core';
import { Replay, Backup } from '@material-ui/icons';
import { RiFolderHistoryLine } from 'react-icons/ri';

const nested = css`
  padding-right: 32px;
  font-size: 16px;
`;
const listIcon = css`
  min-width: 36px;
  color: #0365a2;
`;

const SubMenu = ({ open, restartAppHandler, dbBackupHandler, flushCache }) => {
  return <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>

      <ListItem button className={nested} onClick={dbBackupHandler}>
        <ListItemIcon className={listIcon}>
          <Backup />
        </ListItemIcon>
        גבה בסיס נתונים
      </ListItem>

      <ListItem button className={nested} onClick={flushCache}>
        <ListItemIcon className={listIcon}>
          <SvgIcon component={RiFolderHistoryLine} />
        </ListItemIcon>
        מחק היסטוריית מטמון
      </ListItem>

      <ListItem button className={nested} onClick={restartAppHandler}>
        <ListItemIcon className={listIcon}>
          <Replay />
        </ListItemIcon>
        אתחל אפליקציה
      </ListItem>

    </List>
  </Collapse>;
};

export default SubMenu;