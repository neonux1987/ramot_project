// LIBRARIES
import React from "react";
import { Menu } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import MoreMenuItem from "../../moreMenu/MoreMenuItem";

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

      <MoreMenuItem
        icon={<Description />}
        label="הפק דוחות"
        onClick={onClick}
      />

    </Menu>
  );

}

export default React.memo(MoreBuildingMenu);