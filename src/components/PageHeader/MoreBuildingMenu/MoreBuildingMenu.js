// LIBRARIES
import React from "react";
import { Menu } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import MoreMenuItem from "../../moreMenu/MoreMenuItem";

const MoreBuildingMenu = ({ anchorEl, handleClose, onExcelReportsHandler, onEmptyReportsHandler }) => {

  const onEmptyReportsClick = () => {
    onEmptyReportsHandler();
    handleClose();
  }

  const onExcelReportsClick = () => {
    onExcelReportsHandler();
    handleClose();
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >

      <MoreMenuItem
        icon={<Description />}
        label="הפקת דוחות ריקים"
        onClick={onEmptyReportsClick}
      />

      <MoreMenuItem
        icon={<Description />}
        iconColor="#1ead82"
        label="הפקת דוחות אקסל"
        onClick={onExcelReportsClick}
      />

    </Menu>
  );

}

export default React.memo(MoreBuildingMenu);