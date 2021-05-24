import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { RiBuilding2Fill } from 'react-icons/ri';
import MoreButton from './MoreBuildingMenu/MoreButton';
import Subtitle from './Subtitle';
import MoreBuildingMenu from './MoreBuildingMenu/MoreBuildingMenu';
import useModalLogic from '../../customHooks/useModalLogic';
import GenerateExcelReportsModal from '../modals/GenerateExcelReportsModal';

const container = css`
  margin: 20px 20px 20px;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

const mainIcon = css`
  font-size: 48px;
  display: flex;
  align-items: center;
  color: #555555;
  padding-top: 0px;
  display: none;
`;

const mainTitle = css`
  margin-right: 0px;
  /* color: #6b6b6b; */
  color: #555555;
  font-weight: 500;
  font-size: 2.4rem;
`;

const subContainer = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
`;

const PageHeader = ({ buildingName, buildingId, page }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  }

  return <div className={container} id="pageHeader">

    {/* main container */}
    <div className={mainContainer}>
      <div className={mainIcon}>
        <RiBuilding2Fill />
      </div>

      <Typography className={mainTitle} variant="h3">{buildingName}</Typography>
    </div>
    {/* endmain container */}

    {/* sub container */}
    <div className={subContainer}>

      <Subtitle page={page} />

      {/* more */}
      <MoreButton
        onClick={handleClick}
      />
      <MoreBuildingMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        onExcelReportsHandler={onExcelReportsHandler}
        onEmptyReportsHandler={onEmptyReportsHandler}
      />
      {/* end more */}
    </div>
    {/* end sub container */}

  </div>
}

export default PageHeader;