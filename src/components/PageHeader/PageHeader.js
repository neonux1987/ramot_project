import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { MdHome } from 'react-icons/md';
import MoreButton from './MoreBuildingMenu/MoreButton';
import Subtitle from './Subtitle';
import MoreBuildingMenu from './MoreBuildingMenu/MoreBuildingMenu';
import useModalLogic from '../../customHooks/useModalLogic';
import GenerateExcelReportsModal from '../modals/GenerateExcelReportsModal';
import GenerateEmptyReportsModal from '../modals/GenerateEmptyReportsModal';
import useBuildingColor from '../../customHooks/useBuildingColor';
import ChangeBuildingColorModal from '../modals/ChangeBuildingColorModal';
import BreadcrumbsContainer from '../../Main/Toolbar/Breadcrumbs/BreadcrumbsContainer';
import { useLocation } from 'react-router';

const container = css`
  margin: 20px 10px 20px;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0;
`;

const subContainer = css`
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #f1f1f1; */
`;

const PageHeader = ({ buildingName, buildingId, page }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [buildingColor] = useBuildingColor(buildingId);

  const { pathname, state = {} } = useLocation();
  const [path, setPath] = useState("");

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
  }

  const onEmptyReportsHandler = () => {
    showModal(GenerateEmptyReportsModal, {
      buildingName,
      buildingId
    });
  }

  const onChangeBuildingColorHandler = () => {
    showModal(ChangeBuildingColorModal, {
      buildingName,
      buildingId
    });
  }

  // make the tool bar hide and re-appear on page change
  // to create a cool animation :D
  useEffect(() => {
    setTimeout(() => {
      setPath(() => pathname)
    }, 400);
  }, [pathname]);

  const mainTitle = css`
  margin-right: 10px;
  color: ${buildingColor};
  font-weight: 500;
  font-size: 28px;
`;

  const mainIcon = css`
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #555555;
  padding-top: 0px;
  margin-bottom: 18px;
  border-radius: 3px;
  width: 42px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  display: none;
`;

  return <div className={container} id="pageHeader">

    {/* main container */}
    <div className={mainContainer}>

      {/* more */}
      <MoreButton
        onClick={handleClick}
      />
      <MoreBuildingMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        onExcelReportsHandler={onExcelReportsHandler}
        onEmptyReportsHandler={onEmptyReportsHandler}
        onChangeBuildingColorHandler={onChangeBuildingColorHandler}
      />
      {/* end more */}
    </div>
    {/* endmain container */}

    {/* end sub container */}

  </div>
}

export default PageHeader;