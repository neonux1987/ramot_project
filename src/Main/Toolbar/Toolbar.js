// LIBRARIES
import React from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// SERVICES
import { initiateDbBackup } from '../../services/dbBackup.svc';
import { quitApp } from '../../services/mainProcess.svc';
import { toastManager } from '../../toasts/toastManager';

// CSS
import styles from './Toolbar.module.css';

// COMPONENTS
import ToggleButton from "./ToggleButton/ToggleButton";
import BackupOnExitModal from "../../components/modals/BackupOnExitModal/BackupOnExitModal";
import ToastRender from "../../components/ToastRender/ToastRender";
import FrameControls from "../../AppFrame/FrameControls";

// HOOKS
import useModalLogic from "../../customHooks/useModalLogic";
import { useLocation } from "react-router";
import ControlsContainer from "../../Sidebar/Controls/ControlsContainer";
import BreadcrumbsContainer from "./Breadcrumbs/BreadcrumbsContainer";

const remote = require('electron').remote;

const Toolbar = ({ settings }) => {

  const dispatch = useDispatch();
  const { pathname, state = {} } = useLocation();
  const routes = useSelector(store => store.routes);

  const { showModal } = useModalLogic();
  const { buildingId } = state;

  const onClose = async () => {
    const { isFetching, data } = settings;
    const { backup_on_exit } = data.db_backup;

    // exit without backup if the option
    // selected in settings
    if (backup_on_exit === false) {
      quitApp();
      return Promise.resolve();
    }

    /* start showModal */
    showModal(BackupOnExitModal, {
      onAgreeHandler: async () => {

        // in case the backend stopped working
        // allow to close the app without backing up
        if (isFetching && data.length === 0) {
          quitApp();
          return Promise.resolve();
        }

        const id = toastManager.info(<ToastRender spinner={true} message={"מבצע גיבוי בסיס נתונים לפני יציאה..."} />, {
          autoClose: false
        });

        const promise = await initiateDbBackup().catch((result) => {
          toastManager.update(id, {
            render: <ToastRender message={result.error} />,
            type: toastManager.types.ERROR,
            delay: 3000,
            autoClose: 2500,
            onClose: () => {
              quitApp();
            }
          });
        });

        // success
        if (promise)
          toastManager.update(id, {
            render: <ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה. המערכת מבצעת כעת יציאה..."} />,
            type: toastManager.types.SUCCESS,
            delay: 2000,
            autoClose: 1500,
            onClose: () => {
              quitApp();
            }
          });

      },/* end onAgreeHandler */
      onCancelHandler: () => {
        quitApp();
      }
    });
    /* end showModal */

  }

  const onMinimize = () => {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  const onMaximize = () => {
    const window = remote.getCurrentWindow();

    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  const themeSettings = useSelector(store => store.settings.data.theme);

  const noFollowRule = !themeSettings.sticky_toolbar ? styles.noFollow : "";

  return <div className={classnames(styles.wrapper, noFollowRule)} id="toolbar">

    <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>
      <BreadcrumbsContainer pathname={pathname} />
    </div>

    <ControlsContainer routes={routes} buildingId={buildingId} />

    <FrameControls onMinimize={onMinimize} onMaximize={onMaximize} onClose={onClose} />

  </div>;

}

export default React.memo(Toolbar);