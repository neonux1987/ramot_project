// LIBRARIES
import React, { useEffect } from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './Toolbar.module.css';

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import EditVatModal from "../../components/modals/EditVatModal/EditVatModal";
import VolumeButton from "./VolumeButton/VolumeButton";
import MoreButton from "./MoreButton/MoreButton";
import MoreMenu from "./MoreMenu/MoreMenu";
import VatInfo from "./VatInfo/VatInfo";
import ToggleButton from "./ToggleButton/ToggleButton";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import SavedNotification from "./SavedNotification/SavedNotification";

// ACTIONS
import { toggleSidebar } from '../../redux/actions/sidebarActions';
import generalSettingsActions from '../../redux/actions/generalSettingsActions';

// HOOKS
import useModalLogic from "../../customHooks/useModalLogic";

// SERVICES
import { restartApp } from "../../services/mainProcess.svc";

const Toolbar = ({ buildingName, page }) => {

  const navigationPath = buildingName && page ? `${buildingName} > ${page}` : page;

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

  useEffect(() => {
    dispatch(generalSettingsActions.fetchGeneralSettings());
  }, [dispatch]);

  const restartAppHandler = () => {
    restartApp();
  }

  const tax = isFetching ?
    <Spinner spinnerClass={styles.spinner} size={16} color={"#404040"} /> :
    <span style={{ marginRight: "5px" }}>{`${data[0].tax}%`}</span>;

  return (
    <div className={styles.wrapper}>

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>
        <ToggleButton className={styles.toggleBtn} onClick={() => dispatch(toggleSidebar())} />
        <Breadcrumbs className={styles.breadcrumbs} navigationPath={navigationPath} />
      </div>

      <div className={classnames(styles.section, styles.flexAlignLeft)}>

        <VatInfo className={styles.vatWrapper} tax={tax} />

        <VolumeButton className={styles.volumeBtn} />

        <MoreButton className={styles.moreBtn} onClick={handleClick} />

        <MoreMenu anchorEl={anchorEl} handleClose={handleClose} restartAppHandler={restartAppHandler} taxClickHandler={taxClickHandler} />

      </div>

    </div>

  );

}

export default React.memo(Toolbar);