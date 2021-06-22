import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { BiBuildingHouse } from 'react-icons/bi';
import MoreButton from './MoreBuildingMenu/MoreButton';
import Subtitle from './Subtitle';
import MoreBuildingMenu from './MoreBuildingMenu/MoreBuildingMenu';
import useModalLogic from '../../customHooks/useModalLogic';
import GenerateExcelReportsModal from '../modals/GenerateExcelReportsModal';
import GenerateEmptyReportsModal from '../modals/GenerateEmptyReportsModal';
import useBuildingColor from '../../customHooks/useBuildingColor';
import ChangeBuildingColorModal from '../modals/ChangeBuildingColorModal';

const container = css`
  margin: 20px 20px 20px;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0;
`;

const mainTitle = css`
  margin-right: 15px;
  /* color: #6b6b6b; */
  color: #555555;
  font-weight: 500;
  font-size: 2.8rem;
  padding-bottom: 20px;
`;

const subContainer = css`
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #f1f1f1; */
`;

const PageHeader = ({ buildingName, buildingId, page }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [getBuildingColor] = useBuildingColor();

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

  const buildingColor = getBuildingColor(buildingId);

  const mainIcon = css`
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #ffffff;
  padding-top: 0px;
  margin-bottom: 18px;
  margin-left: 5px;
  border-radius: 3px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${buildingColor};

  :after{
    content: "";
    position: absolute;
    top: 16px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 10px solid ${buildingColor};
    border-bottom: 10px solid transparent;
  }
`;

  return <div className={container} id="pageHeader">

    {/* main container */}
    <div className={mainContainer}>
      <div className={mainIcon} className={mainIcon}>
        <BiBuildingHouse />
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
        onChangeBuildingColorHandler={onChangeBuildingColorHandler}
      />
      {/* end more */}
    </div>
    {/* end sub container */}

  </div>
}

export default PageHeader;