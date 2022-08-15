// LIBRARIES
import React from "react";
import { Menu, useTheme } from "@material-ui/core";
import MoreMenuItem from "../../../../components/moreMenu/MoreMenuItem";
import DescriptionIcon from "../../../../components/Icons/DescriptionIcon";
import ColorPaletteIcon from "../../../../components/Icons/ColorPaletteIcon";

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
  };

  const onExcelReportsClick = () => {
    onExcelReportsHandler();
    handleClose();
  };

  const onChangeBuildingColorClick = () => {
    onChangeBuildingColorHandler();
    handleClose();
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      disableAutoFocusItem
    >
      <MoreMenuItem
        icon={<DescriptionIcon color={primaryColor} />}
        label="הפקת דוחות ריקים"
        onClick={onEmptyReportsClick}
      />

      <MoreMenuItem
        icon={<DescriptionIcon color={primaryColor} />}
        iconColor="#000000"
        label="הפקת דוחות אקסל"
        onClick={onExcelReportsClick}
      />

      <MoreMenuItem
        icon={<ColorPaletteIcon color={primaryColor} />}
        iconColor="#000000"
        label="שנה צבע בניין"
        onClick={onChangeBuildingColorClick}
      />
    </Menu>
  );
};

export default React.memo(MoreBuildingMenu);
