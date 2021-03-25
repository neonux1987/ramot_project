// LIBRARIES
import React from "react";
import { Menu, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore, Description, TableChart, ChangeHistory, Settings } from "@material-ui/icons";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import ButtonNavLinkWithSound from "../../../componentsWithSound/ButtonNavLinkWithSound/ButtonNavLinkWithSound";
import { exportToExcelBulk } from "../../../services/excel.svc";

const MoreBuildingMenu = ({ anchorEl, handleClose, generateReports }) => {

  const upgradedHandleClose = () => {
    handleClose();
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={upgradedHandleClose}
    >

      <ListItem
        button
        component={ButtonWithSound}
        onClick={generateReports}
      >
        <ListItemIcon>
          <Description />
        </ListItemIcon>
        <ListItemText primary="הפק כל הדוחות לבניין זה" />
      </ListItem>

    </Menu>
  );

}

export default React.memo(MoreBuildingMenu);