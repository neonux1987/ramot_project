// LIBRARIES
import React from "react";
import { Menu, useTheme } from "@material-ui/core";
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

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

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
        icon={<SvgIcon Icon={MdDescription} color={primaryColor} />}
        label="הפקת דוחות ריקים"
        onClick={onEmptyReportsClick}
      />

      <MoreMenuItem
        icon={<SvgIcon Icon={MdDescription} color={primaryColor} />}
        iconColor="#000000"
        label="הפקת דוחות אקסל"
        onClick={onExcelReportsClick}
      />

      <MoreMenuItem
        icon={<SvgIcon Icon={MdColorLens} color={primaryColor} />}
        iconColor="#000000"
        label="שנה צבע בניין"
        onClick={onChangeBuildingColorClick}
      />

    </Menu>
  );

}

export default React.memo(MoreBuildingMenu);