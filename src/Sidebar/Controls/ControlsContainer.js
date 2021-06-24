import React from 'react';
import VolumeButton from './VolumeButton/VolumeButton';
import MoreButton from './MoreButton/MoreButton';
import MoreMenu from './MoreMenu/MoreMenu';
import EditVatModal from '../../components/modals/EditVatModal/EditVatModal';
import useModalLogic from '../../customHooks/useModalLogic';
import { restartApp } from '../../services/mainProcess.svc'
import { css } from 'emotion';
import SpinningButton from '../../components/buttons/SpinningButton/SpinningButton';
import { Settings } from '@material-ui/icons';
import Controls from './Controls';
import useBuildingColor from '../../customHooks/useBuildingColor';

const volumeBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #8c49d6;
  color: #fff; */
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  color: #dddddd;
  min-width: 0;
  margin: 0 10px;
`;

const moreBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: #dddddd;
  border: none;
  outline: none;
  cursor: pointer;
  min-width: 0;
  margin: 0 10px;
`;

const settingsBtn = css`
  margin: 0 10px;
`;

const ControlsContainer = ({ routes, buildingId }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [buildingColor] = useBuildingColor(buildingId);

  const { showModal } = useModalLogic();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const taxClickHandler = () => {
    handleClose();
    showModal(EditVatModal);
  }

  const restartAppHandler = () => {
    restartApp();
  }

  return <Controls bgColor={buildingColor}>

    <SpinningButton
      className={settingsBtn}
      Icon={Settings}
      to={{
        pathname: `/הגדרות`,
        state: {
          page: "כללי",
          buildingName: "הגדרות",
          buildingId: "settings"
        }
      }}
      active={routes.active.state.buildingName === "הגדרות"}
    />

    <VolumeButton className={volumeBtn} />

    <MoreButton
      className={moreBtn}
      onClick={handleClick}
      active={routes.active.state.buildingName === "ניהול"}
    />

    <MoreMenu anchorEl={anchorEl} handleClose={handleClose} restartAppHandler={restartAppHandler} taxClickHandler={taxClickHandler} />

  </Controls>
}

export default React.memo(ControlsContainer);