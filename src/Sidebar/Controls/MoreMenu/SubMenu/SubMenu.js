import React from 'react';
import { css } from 'emotion';
import { Collapse, List, SvgIcon } from '@material-ui/core';
import { Replay, Backup } from '@material-ui/icons';
import { RiFolderHistoryLine } from 'react-icons/ri';
import MoreMenuItem from '../../../../components/moreMenu/MoreMenuItem';

const nested = css`
  padding-right: 32px;
  font-size: 16px;
`;

const SubMenu = ({ open, restartAppHandler, dbBackupHandler, purgeCache }) => {
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
        onClick={purgeCache}
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