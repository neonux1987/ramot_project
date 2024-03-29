import React, { useState, memo, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToastRender from "../../../../components/ToastRender/ToastRender";
import Page from "../../../../components/Page/Page";
import ExpandableSection from "../../../../components/Section/ExpandableSection";
import NewUpdate from "./NewUpdate/NewUpdate";
import NoUpdate from "./NoUpdate/NoUpdate";
import CheckingUpdates from "./CheckingUpdates/CheckingUpdates";
import {
  checkForUpdates,
  downloadUpdate,
  abortDownload,
  deleteUpdate,
  installUpdate
} from "../../../../services/updates.svc";
import { initiateDbBackup } from "../../../../services/dbBackup.svc";
import {
  updateSpecificSettings,
  saveSettings
} from "../../../../redux/actions/settingsActions";
import { toastManager } from "../../../../toasts/toastManager";
import WhiteButton from "../../../../components/buttons/WhiteButton";

// ELECTRON
import { ipcRenderer } from "electron";
import UpdateIco from "../../../../components/Icons/UpdateIcon";

const UpdateIcon = (props) => (
  <UpdateIco width="30px" height="30px" {...props} />
);

const SETTINGS_NAME = "appUpdates";

const AppUpdates = () => {
  const isCancelled = useRef(false);
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(progressState());
  const appUpdatesSettings = useSelector(
    (store) => store.settings.data[SETTINGS_NAME]
  );

  const {
    availableUpdate,
    updateVersion,
    releaseDate,
    updateDownloaded
    //updateFilePath
  } = appUpdatesSettings;

  const downloadHandler = async () => {
    if (!isDownloading && !updateDownloaded) {
      if (!isCancelled.current) setIsDownloading(true);

      const promise = await dispatch(downloadUpdate());

      if (promise === undefined)
        if (!isCancelled.current) setIsDownloading(false);
    }
  };

  const installHandler = async () => {
    const id = toastManager.info(
      <ToastRender
        spinner={true}
        message={"מבצע גיבוי בסיס נתונים לפני התקנה..."}
      />,
      {
        autoClose: false
      }
    );

    const promise = await initiateDbBackup().catch((result) => {
      toastManager.update(id, {
        render: <ToastRender message={result.error} />,
        type: toastManager.types.ERROR,
        delay: 2500,
        autoClose: 2500
      });
    });

    // success
    if (promise)
      toastManager.update(id, {
        render: (
          <ToastRender
            done={true}
            message={
              "גיבוי בסיס הנתונים הסתיים. המערכת מבצעת יציאה לצורך התקנת העידכון."
            }
          />
        ),
        type: toastManager.types.SUCCESS,
        delay: 3000,
        autoClose: 2500,
        onClose: () => {
          installUpdate();
        }
      });
  };

  // abort download handler
  const abortDownloadHandler = useCallback(async (silent) => {
    if (!isCancelled.current) setIsDownloading(false);
    if (!isCancelled.current) setProgress(progressState());
    await abortDownload(silent);
  }, []);

  // refresh handler
  const refreshHandler = async (event) => {
    event.stopPropagation();

    if (!isCancelled.current) {
      setIsChecking(true);
      setIsDownloading(false);
      setProgress(progressState());
    }

    await abortDownloadHandler();
    await dispatch(checkForUpdates());
  };

  // delete update handler
  const deleteUpdateHandler = async (event) => {
    event.stopPropagation();

    // get rid of the file name to get the folder for deletion
    //var index = updateFilePath.indexOf("\\update.exe");
    var newPath = `C:\\Users\\Admin\\AppData\\Local\\ramot-group-income-outcome-management-updater\\pending\\`; //updateFilePath.substr(0, index)

    const promise = await deleteUpdate(newPath);

    // reset settings
    if (promise) {
      await dispatch(
        updateSpecificSettings(SETTINGS_NAME, {
          availableUpdate: false,
          updateVersion: "",
          releaseDate: "",
          userNotified: false,
          updateDownloaded: false,
          updateFilePath: ""
        })
      );
      await dispatch(saveSettings(false));
      await dispatch(checkForUpdates());
    }
  };

  useEffect(() => {
    dispatch(checkForUpdates());
  }, [dispatch]);

  useEffect(() => {
    // remove all listeners if exist before
    // registering news once in case of same
    // listenres were registered again despite never removed
    // due to renderer refresh
    ipcRenderer.removeAllListeners("download_progress");
    ipcRenderer.removeAllListeners("update_available");
    ipcRenderer.removeAllListeners("update_not_available");
    ipcRenderer.removeAllListeners("downloading_update");
    ipcRenderer.removeAllListeners("update_downloaded");
    ipcRenderer.removeAllListeners("updater_error");

    // download progress
    ipcRenderer.on("download_progress", async (event, progress) => {
      if (!isCancelled.current) setProgress(progress);
    });

    ipcRenderer.on("update_available", async (event, result) => {
      const { version, releaseDate } = result.data;

      if (!isCancelled.current) setIsChecking(false);

      if (!updateDownloaded || version !== updateVersion) {
        await dispatch(
          updateSpecificSettings(SETTINGS_NAME, {
            availableUpdate: true,
            updateVersion: version,
            releaseDate,
            updateDownloaded: false,
            userNotified: true
          })
        );
        await dispatch(saveSettings(false));
      }
    });

    ipcRenderer.on("update_not_available", async (event) => {
      if (!isCancelled.current) setIsChecking(false);

      await dispatch(
        updateSpecificSettings(SETTINGS_NAME, {
          availableUpdate: false,
          updateVersion: "",
          releaseDate: "",
          updateDownloaded: false,
          userNotified: false,
          updateFilePath: ""
        })
      );
      await dispatch(saveSettings(false));
    });

    ipcRenderer.on("downloading_update", (event, result) => {
      if (result.data) if (!isCancelled.current) setIsDownloading(true);
    });

    ipcRenderer.on("update_downloaded", async (event, result) => {
      if (!isCancelled.current) setIsDownloading(false);

      await dispatch(
        updateSpecificSettings(SETTINGS_NAME, {
          updateDownloaded: true,
          updateFilePath: result.data.downloadedFile
        })
      );
      await dispatch(saveSettings(false));
    });

    ipcRenderer.on("updater_error", async (event, result) => {
      toastManager.error(result.error);
      if (!isCancelled.current) setIsDownloading(false);
    });
  }, [dispatch, updateDownloaded, updateVersion]);

  // cleanup
  useEffect(() => {
    return () => {
      isCancelled.current = true;
      ipcRenderer.removeAllListeners("download_progress");
      ipcRenderer.removeAllListeners("update_available");
      ipcRenderer.removeAllListeners("update_not_available");
      ipcRenderer.removeAllListeners("downloading_update");
      ipcRenderer.removeAllListeners("update_downloaded");
      ipcRenderer.removeAllListeners("updater_error");
      abortDownloadHandler();
    };
  }, [abortDownloadHandler]);

  const renderNewUpdate = () => {
    return !isChecking && availableUpdate ? (
      <NewUpdate
        updateVersion={updateVersion}
        releaseDate={releaseDate}
        updateDownloaded={updateDownloaded}
        progress={progress}
        isDownloading={isDownloading}
        downloadHandler={downloadHandler}
        installHandler={installHandler}
        abortDownloadHandler={abortDownloadHandler}
        deleteUpdateHandler={deleteUpdateHandler}
      />
    ) : (
      <NoUpdate />
    );
  };

  const content = isChecking ? <CheckingUpdates /> : renderNewUpdate();

  return (
    <Page>
      <ExpandableSection
        title={"עדכוני תוכנה"}
        Icon={UpdateIcon}
        extraDetails={<WhiteButton onClick={refreshHandler}>רענן</WhiteButton>}
      >
        {content}
      </ExpandableSection>
    </Page>
  );
};

export default memo(AppUpdates);

function progressState() {
  return {
    percent: 0,
    total: 0,
    transferred: 0,
    bytesPerSecond: 0
  };
}
