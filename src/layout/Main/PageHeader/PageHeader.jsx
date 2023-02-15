import { css } from "emotion";
import React from "react";
import SelectButton from "../../../components/buttons/SelectButton";
import BreadcrumbsContainer from "../../AppBar/Breadcrumbs/BreadcrumbsContainer";
import MoreBuildingMenu from "./MoreBuildingMenu/MoreBuildingMenu";

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

const PageHeader = ({
  pathname,
  isPathValid,
  handleClick,
  anchorEl,
  handleClose,
  onExcelReportsHandler,
  onEmptyReportsHandler,
  onChangeBuildingColorHandler
}) => {
  return (
    <div className={container} id="pageHeader">
      <div className={mainContainer}>
        <div className={breadcrumbsWrapper}>
          <BreadcrumbsContainer pathname={pathname} />
        </div>

        {isPathValid && (
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
