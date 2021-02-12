import React, { useEffect } from 'react';
import styles from './AppFrameContainer.module.css';
import classnames from 'classnames';
import { Minimize, CheckBoxOutlineBlank, Close } from '@material-ui/icons';
import Helper from '../helpers/Helper';
import icon from '../assets/images/ramot-group-icon.ico'
import Logo from './Logo/Logo';
import VatInfo from '../Main/Toolbar/VatInfo/VatInfo';
import VolumeButton from '../Main/Toolbar/VolumeButton/VolumeButton';
import MoreButton from '../Main/Toolbar/MoreButton/MoreButton';
import MoreMenu from '../Main/Toolbar/MoreMenu/MoreMenu';
import { useDispatch, useSelector } from 'react-redux';
import generalSettingsActions from '../redux/actions/generalSettingsActions';
import Spinner from '../components/Spinner/Spinner';
import EditVatModal from '../components/modals/EditVatModal/EditVatModal';
import useModalLogic from '../customHooks/useModalLogic';
import ToggleButton from '../Main/Toolbar/ToggleButton/ToggleButton';
import Breadcrumbs from '../Main/Toolbar/Breadcrumbs/Breadcrumbs';
import { toggleSidebar } from '../redux/actions/sidebarActions';

const AppFrameContainer = ({ handlers }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const dispatch = useDispatch();

  const { isFetching, data } = useSelector(store => store.generalSettings.generalSettings);

  const { page, buildingName } = useSelector(store => store.routes.active.state);

  const themeSettings = useSelector(store => store.settings.data.theme);

  useEffect(() => {
    dispatch(generalSettingsActions.fetchGeneralSettings());
  }, [dispatch]);

  const restartAppHandler = () => {
    //restartApp();
  }

  const tax = isFetching ?
    <Spinner spinnerClass={styles.spinner} size={16} color={"#404040"} /> :
    <span className={styles.taxValue}>{`${data[0].tax}%`}</span>;


  return (
    <div className={styles.appFrame}>

      <div className={styles.draggableRegion}>
        <div className={styles.section}>
          <Logo />
        </div>

        <div className={styles.section} style={{ flex: "1 1", display: "flex", justifyContent: "end" }}>
          <ToggleButton className={classnames(styles.toggleBtn, styles.noDrag)} onClick={() => dispatch(toggleSidebar())} />
        </div>

        <div className={styles.section} style={{ flex: "1 1" }}>

          <div className={styles.controls}>

            {/* <VatInfo className={styles.vatWrapper} tax={tax} /> */}

            <VolumeButton className={styles.volumeBtn} />

            <MoreButton className={styles.moreBtn} onClick={handleClick} />

            <MoreMenu anchorEl={anchorEl} handleClose={handleClose} restartAppHandler={restartAppHandler} taxClickHandler={taxClickHandler} />

          </div>

          <div className={styles.actions}>
            <button className={classnames(styles.button, styles.minimize)} onClick={handlers.minimize}><Minimize /></button>
            <button className={classnames(styles.button, styles.maximize)} onClick={handlers.maximize}><CheckBoxOutlineBlank /></button>
            <button className={classnames(styles.button, styles.close)} onClick={handlers.close}><Close /></button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AppFrameContainer;