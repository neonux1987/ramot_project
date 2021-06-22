// LIBRARIES
import React from "react";
import { Menu } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { HiColorSwatch } from 'react-icons/hi';

import MoreMenuItem from "../../moreMenu/MoreMenuItem";
import SvgIcon from "../../SvgIcon/SvgIcon";

const MoreBuildingMenu = ({
  anchorEl,
  handleClose,
  onExcelReportsHandler,
  onEmptyReportsHandler,
  onChangeBuildingColorHandler
}) => {

  const onEmptyReportsClick = () => {
    onEmptyReportsHandler();
    handleClose();
  }

  const onExcelReportsClick = () => {
    onExcelReportsHandler();
    handleClose();
  }

  const onChangeBuildingColorClick = () => {
    onChangeBuildingColorHandler();
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

      <MoreMenuItem
        icon={<SvgIcon Icon={HiColorSwatch} color="#c934ef" />}
        iconColor="#c934ef"
        label="שנה צבע בניין"
        onClick={onChangeBuildingColorClick}
      />

    </Menu>
  );

}

export default React.memo(MoreBuildingMenu);