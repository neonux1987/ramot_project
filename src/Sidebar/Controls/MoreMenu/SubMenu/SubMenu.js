import React from 'react';
import { css } from 'emotion';
import { ListItem, ListItemIcon, Collapse, List, SvgIcon } from '@material-ui/core';
import { Replay, Backup } from '@material-ui/icons';
import { RiFolderHistoryLine } from 'react-icons/ri';
import MoreMenuItem from '../../../../components/moreMenu/MoreMenuItem';

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

      <MoreMenuItem
        icon={<Backup />}
        label="גבה בסיס נתונים"
        onClick={dbBackupHandler}
        listItemClass={nested}
      />

      <MoreMenuItem
        icon={<SvgIcon component={RiFolderHistoryLine} />}
        label="מחק היסטוריית מטמון"
        onClick={flushCache}
        listItemClass={nested}
      />

      <MoreMenuItem
        icon={<Replay />}
        label="אתחל אפליקציה"
        onClick={restartAppHandler}
        listItemClass={nested}
      />

    </List>
  </Collapse>;
};

export default SubMenu;