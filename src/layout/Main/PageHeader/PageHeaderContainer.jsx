import React from "react";
import useModalLogic from "../../../customHooks/useModalLogic";
import GenerateExcelReportsModal from "../../../components/modals/GenerateExcelReportsModal";
import GenerateEmptyReportsModal from "../../../components/modals/GenerateEmptyReportsModal";
import ChangeBuildingColorModal from "../../../components/modals/ChangeBuildingColorModal";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";

const PageHeaderContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { pathname, state = {} } = useLocation();
  const { buildingName, buildingId } = state;
  const { showModal } = useModalLogic();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onExcelReportsHandler = () => {
    showModal(GenerateExcelReportsModal, {
      buildingName,
      buildingId
    });
  };

  const onEmptyReportsHandler = () => {
    showModal(GenerateEmptyReportsModal, {
      buildingName,
      buildingId
    });
  };

  const onChangeBuildingColorHandler = () => {
    showModal(ChangeBuildingColorModal, {
      buildingName,
      buildingId
    });
  };

  const isPathValid = (buildingId) => {
    let isValid = true;
    switch (buildingId) {
      case "settings":
        isValid = false;
        break;
      case "home":
        isValid = false;
        break;
      case "management":
        isValid = false;
        break;
      default:
        return true;
    }
    return isValid;
  };

  return (
    <PageHeader
      pathname={pathname}
      isPathValid={isPathValid(buildingId)}
      handleClick={handleClick}
      anchorEl={anchorEl}
      handleClose={handleClose}
      onExcelReportsHandler={onExcelReportsHandler}
      onEmptyReportsHandler={onEmptyReportsHandler}
      onChangeBuildingColorHandler={onChangeBuildingColorHandler}
    />
  );
};

export default PageHeaderContainer;
