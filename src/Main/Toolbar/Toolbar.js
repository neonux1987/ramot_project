// LIBRARIES
import React, { useEffect } from "react";
import classnames from 'classnames';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './Toolbar.module.css';

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import EditVatModal from "../../components/modals/EditVatModal/EditVatModal";
import VolumeButton from "./VolumeButton/VolumeButton";
import MoreButton from "./MoreButton/MoreButton";
import MoreMenu from "./MoreMenu/MoreMenu";

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

        <button
          className={styles.toggleBtn}
          onClick={() => dispatch(toggleSidebar())}
        >
          <MenuIcon style={{ display: "flex" }} />
        </button>
        <div style={{ marginRight: "10px", fontWeight: "600", fontSize: "15px" }}>
          {`${navigationPath}`}
        </div>
      </div>

      {/* <div className={classnames(styles.section, styles.alignCenter)}>
        {`שנה ${props.year} / ${props.quarter} / חודש ${props.month}`}
      </div> */}

      <div className={classnames(styles.section, styles.flexAlignLeft)}>

        <div className={styles.vatWrapper}>
          <span>מע"מ נוכחי: </span>{tax}
        </div>

        <VolumeButton className={styles.volumeBtn} />

        <MoreButton className={styles.moreBtn} onClick={handleClick} />

        <MoreMenu anchorEl={anchorEl} handleClose={handleClose} restartAppHandler={restartAppHandler} taxClickHandler={taxClickHandler} />

      </div>

    </div>

  );

}

export default React.memo(Toolbar);