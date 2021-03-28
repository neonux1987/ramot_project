// LIBRARIES
import React from "react";
import { css } from 'emotion';
import { Menu, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";

const listItemIcon = css`
  min-width: 36px;
  color: #555555;
  
`;

const listItemText = css`
  padding: 0px 16px;
  width: 100%;
  font-size: 16px;
`;


const MoreBuildingMenu = ({ anchorEl, handleClose, generateReports }) => {

  const onClick = () => {
    generateReports();
    handleClose();
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >

      <ListItem
        button
        component={ButtonWithSound}
        onClick={onClick}
      >
        <ListItemIcon className={listItemIcon}>
          <Description />
        </ListItemIcon>
        <ListItemText className={listItemText} primary="הפק דוחות" />
      </ListItem>

    </Menu>
  );

}

export default React.memo(MoreBuildingMenu);