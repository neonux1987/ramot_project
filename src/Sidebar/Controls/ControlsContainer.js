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
import { Icon } from '@iconify/react';

const volumeBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #8c49d6;
  color: #000000; */
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  color: #00000;
  min-width: 0;
  margin: 0 10px;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
`;

const moreBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: #00000;
  border: none;
  outline: none;
  cursor: pointer;
  min-width: 0;
  margin: 0 10px;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
`;

const settingsBtn = css`
  margin: 0 10px;
  -webkit-app-region: no-drag;
  color: #000000 !important;
`;

const SettingsIcon = () => <Icon icon="akar-icons:settings-vertical" width="24" height="24" />;

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
      Icon={SettingsIcon}
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