import React from "react";
import { css } from "emotion";
import { Collapse, List } from "@material-ui/core";
import MoreMenuItem from "../../../../../components/moreMenu/MoreMenuItem";
import HistoryIcon from "../../../../../components/Icons/HistoryIcon";
import BackupIcon from "../../../../../components/Icons/BackupIcon";
import ResetIcon from "../../../../../components/Icons/ResetIcon";

const nested = css`
  padding-right: 32px;
  font-size: 16px;
`;

const SubMenu = ({ open, restartAppHandler, dbBackupHandler, purgeCache }) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <MoreMenuItem
          icon={<BackupIcon />}
          label="גבה בסיס נתונים"
          onClick={dbBackupHandler}
          listItemClass={nested}
        />

        <MoreMenuItem
          icon={<HistoryIcon />}
          label="מחק היסטוריית מטמון"
          onClick={purgeCache}
          listItemClass={nested}
        />

        <MoreMenuItem
          icon={<ResetIcon />}
          label="אתחל אפליקציה"
          onClick={restartAppHandler}
          listItemClass={nested}
        />
      </List>
    </Collapse>
  );
};

export default SubMenu;
