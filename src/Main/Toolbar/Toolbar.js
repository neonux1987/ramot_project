// LIBRARIES
import React, { useEffect, useState } from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

// SERVICES
import { initiateDbBackup } from '../../services/dbBackup.svc';
import { quitApp } from '../../services/mainProcess.svc';
import { toastManager } from '../../toasts/toastManager';

// CSS
import styles from './Toolbar.module.css';

// COMPONENTS
import ToggleButton from "./ToggleButton/ToggleButton";
import BreadcrumbsContainer from "./Breadcrumbs/BreadcrumbsContainer";
import BackupOnExitModal from "../../components/modals/BackupOnExitModal/BackupOnExitModal";
import ToastRender from "../../components/ToastRender/ToastRender";
import FrameControls from "../../AppFrame/FrameControls";

// ACTIONS
import { toggleSidebar } from '../../redux/actions/toggleSidebarActions';
import { Slide } from "@material-ui/core";

// HOOKS
import useModalLogic from "../../customHooks/useModalLogic";
import { useLocation } from "react-router";
import useBuildingColor from "../../customHooks/useBuildingColor";
import ControlsContainer from "../../Sidebar/Controls/ControlsContainer";

const remote = require('electron').remote;

const Toolbar = ({ settings }) => {

  const dispatch = useDispatch();
  const { pathname, state = {} } = useLocation();
  const [path, setPath] = useState("");
  const routes = useSelector(store => store.routes);

  const [show, setShow] = useState(true);
  const { showModal } = useModalLogic();
  const { buildingId } = state;

  const [buildingColor] = useBuildingColor(buildingId);

  const onClick = () => {
    dispatch(toggleSidebar());
  };

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

  // make the tool bar hide and re-appear on page change
  // to create a cool animation :D
  useEffect(() => {
    setShow(false);

    setTimeout(() => {
      setShow(true);
      setPath(() => pathname)
    }, 400);
  }, [pathname]);

  const themeSettings = useSelector(store => store.settings.data.theme);

  const noFollowRule = !themeSettings.sticky_toolbar ? styles.noFollow : "";

  return <Slide direction="down" in={show} timeout={400}>
    <div className={classnames(styles.wrapper, noFollowRule, css`background-color: ${buildingColor} !important`)} id="toolbar">

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>
        <ToggleButton onClick={onClick} />
        <BreadcrumbsContainer pathname={path} />
      </div>

      <ControlsContainer routes={routes} buildingId={buildingId} />

      <FrameControls onMinimize={onMinimize} onMaximize={onMaximize} onClose={onClose} />

    </div>
  </Slide>;

}

export default React.memo(Toolbar);