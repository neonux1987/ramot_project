// LIBRARIES
import React from "react";
import { Menu } from "@material-ui/core";
import { MdColorLens, MdDescription } from 'react-icons/md';

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
        icon={<SvgIcon Icon={MdDescription} color="#0e7ab9" />}
        label="הפקת דוחות ריקים"
        onClick={onEmptyReportsClick}
      />

      <MoreMenuItem
        icon={<SvgIcon Icon={MdDescription} color="#1ead82" />}
        iconColor="#1ead82"
        label="הפקת דוחות אקסל"
        onClick={onExcelReportsClick}
      />

      <MoreMenuItem
        icon={<SvgIcon Icon={MdColorLens} color="#c934ef" />}
        iconColor="#c934ef"
        label="שנה צבע בניין"
        onClick={onChangeBuildingColorClick}
      />

    </Menu>
  );

}

export default React.memo(MoreBuildingMenu);