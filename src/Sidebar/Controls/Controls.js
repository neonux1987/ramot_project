import React from 'react';
import VolumeButton from '../../Main/Toolbar/VolumeButton/VolumeButton';
import MoreButton from '../../Main/Toolbar/MoreButton/MoreButton';
import MoreMenu from '../../Main/Toolbar/MoreMenu/MoreMenu';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import EditVatModal from '../../components/modals/EditVatModal/EditVatModal';
import useModalLogic from '../../customHooks/useModalLogic';
import { restartApp } from '../../services/mainProcess.svc'
import { css } from 'emotion';
import SpinningButton from '../../components/SpinningButton/SpinningButton';
import { Settings } from '@material-ui/icons';

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
  color: rgb(79,84,86);
  min-width: 0;
  margin: 0 10px;
`;

const moreBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color:rgb(79,84,86);
  border: none;
  outline: none;
  cursor: pointer;
  min-width: 0;
  margin: 0 10px;
`;

const settingsBtn = css`
  margin: 0 10px;
`;

const Controls = ({ className }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const routes = useSelector(store => store.routes);

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

  const themeSettings = useSelector(store => store.settings.data.theme);

  const restartAppHandler = () => {
    restartApp();
  }

  return <div className={className}>

    <SpinningButton
      className={settingsBtn}
      Icon={Settings}
      to={{
        pathname: `/הגדרות`,
        state: {
          page: "כללי",
          buildingName: "הגדרות",
          buildingNameEng: "settings"
        }
      }}
      active={routes.active.state.buildingName === "הגדרות"}
    />

    <VolumeButton className={volumeBtn} />

    <MoreButton className={moreBtn} onClick={handleClick} />

    <MoreMenu anchorEl={anchorEl} handleClose={handleClose} restartAppHandler={restartAppHandler} taxClickHandler={taxClickHandler} />

  </div>
}

export default Controls;