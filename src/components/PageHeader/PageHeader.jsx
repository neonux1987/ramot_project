import React from "react";
import { css } from "emotion";
import MoreButton from "./MoreBuildingMenu/MoreButton";
import MoreBuildingMenu from "./MoreBuildingMenu/MoreBuildingMenu";
import useModalLogic from "../../customHooks/useModalLogic";
import GenerateExcelReportsModal from "../modals/GenerateExcelReportsModal";
import GenerateEmptyReportsModal from "../modals/GenerateEmptyReportsModal";
import ChangeBuildingColorModal from "../modals/ChangeBuildingColorModal";
import SelectButton from "../buttons/SelectButton";
import { useLocation } from "react-router";
import BreadcrumbsContainer from "../../layout/AppBar/Breadcrumbs/BreadcrumbsContainer";

const container = css`
  margin: 15px;
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 14px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem;
  height: 70px;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0;
  flex-grow: 1;
`;

const breadcrumbsWrapper = css`
  flex-grow: 1;
`;

const PageHeader = () => {
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
      buildingId,
    });
  };

  const onEmptyReportsHandler = () => {
    showModal(GenerateEmptyReportsModal, {
      buildingName,
      buildingId,
    });
  };

  const onChangeBuildingColorHandler = () => {
    showModal(ChangeBuildingColorModal, {
      buildingName,
      buildingId,
    });
  };

  return (
    <div className={container} id="pageHeader">
      <div className={mainContainer}>
        <div className={breadcrumbsWrapper}>
          <BreadcrumbsContainer pathname={pathname} />
        </div>
        {/* <MoreButton onClick={handleClick} /> */}
        {buildingId !== "settings" && (
          <SelectButton onClick={handleClick} label="פעולות נוספות" />
        )}

        <MoreBuildingMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          onExcelReportsHandler={onExcelReportsHandler}
          onEmptyReportsHandler={onEmptyReportsHandler}
          onChangeBuildingColorHandler={onChangeBuildingColorHandler}
        />
      </div>
    </div>
  );
};

export default PageHeader;
