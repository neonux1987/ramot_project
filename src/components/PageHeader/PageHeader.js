import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { RiBuilding2Fill } from 'react-icons/ri';
import MoreButton from './MoreBuildingMenu/MoreButton';
import Subtitle from './Subtitle';
import MoreBuildingMenu from './MoreBuildingMenu/MoreBuildingMenu';
import useModalLogic from '../../customHooks/useModalLogic';
import GenerateExcelReportsModal from '../modals/GenerateExcelReportsModal';
import GenerateEmptyReportsModal from '../modals/GenerateEmptyReportsModal';
import classnames from 'classnames';
import useBuildingColor from '../../customHooks/useBuildingColor';

const container = css`
  margin: 20px 20px 20px;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0;
`;

const mainIcon = css`
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #f5f5f5;
  padding-top: 0px;
  margin-bottom: 18px;
  margin-left: 5px;
  padding: 5px;
  border-radius: 3px;
`;

const mainTitle = css`
  margin-right: 10px;
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

const PageHeader = ({ buildingName, buildingId, page, color }) => {

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

  return <div className={container} id="pageHeader">

    {/* main container */}
    <div className={mainContainer}>
      <div className={classnames(mainIcon, css`background-color:${getBuildingColor(buildingId)}`)}>
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