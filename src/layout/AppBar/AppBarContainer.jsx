import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import AppBar from "./AppBar";
import useModalLogic from "../../customHooks/useModalLogic";
import {
  maximizeWindow,
  minimizeWindow,
  quitApp
} from "../../services/mainProcess.svc";
import { toastManager } from "../../toasts/toastManager";
import { initiateDbBackup } from "../../services/dbBackup.svc";
import ToastRender from "../../components/ToastRender/ToastRender";
import BackupOnExitModal from "../../components/modals/BackupOnExitModal/BackupOnExitModal";

const AppBarContainer = () => {
  const showSidebar = useSelector((store) => store.toggleSidebar.showSidebar);
  const settings = useSelector((store) => store.settings);

  const { showModal } = useModalLogic();

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

        const id = toastManager.info(
          <ToastRender
            spinner={true}
            message={"מבצע גיבוי בסיס נתונים לפני יציאה..."}
          />,
          {
            autoClose: false
          }
        );

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
            render: (
              <ToastRender
                done={true}
                message={
                  "גיבוי בסיס הנתונים הסתיים בהצלחה. המערכת מבצעת כעת יציאה..."
                }
              />
            ),
            type: toastManager.types.SUCCESS,
            delay: 2000,
            autoClose: 1500,
            onClose: () => {
              quitApp();
            }
          });
      } /* end onAgreeHandler */,
      onCancelHandler: () => {
        quitApp();
      }
    });
    /* end showModal */
  };

  const onMinimize = () => {
    minimizeWindow();
  };

  const onMaximize = () => {
    maximizeWindow();
  };

  return (
    <Fragment>
      <AppBar
        showSidebar={showSidebar}
        onClose={onClose}
        onMaximize={onMaximize}
        onMinimize={onMinimize}
      />
    </Fragment>
  );
};

export default AppBarContainer;
