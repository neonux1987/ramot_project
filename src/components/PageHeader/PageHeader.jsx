import React from 'react';
import { css } from 'emotion';
import MoreButton from './MoreBuildingMenu/MoreButton';
import MoreBuildingMenu from './MoreBuildingMenu/MoreBuildingMenu';
import useModalLogic from '../../customHooks/useModalLogic';
import GenerateExcelReportsModal from '../modals/GenerateExcelReportsModal';
import GenerateEmptyReportsModal from '../modals/GenerateEmptyReportsModal';
import ChangeBuildingColorModal from '../modals/ChangeBuildingColorModal';

const container = css`
  margin: 20px 0 20px;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0;
`;

const PageHeader = ({ buildingName, buildingId }) => {

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

  return <div className={container} id="pageHeader">
    <div className={mainContainer}>
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
    </div>
  </div>
}

export default PageHeader;