import React from 'react';
import DateDetails from '../components/DateDetails/DateDetails';

export default (WrappedComponent) => {

  const isCancelled = useRef(false);

  const dispatch = useDispatch();

  const [updateAvailable, setUpdateAvailable] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);

  const [progress, setProgress] = useState({
    percent: 0,
    total: 0,
    transferred: 0,
    bytesPerSecond: 0
  });

  useEffect(() => {

    // download progress
    ipcRenderer.on("download_progress", async (event, progress) => {
      if (!isCancelled.current) setProgress(progress);
    });

    ipcRenderer.on("update_available", async (event, result) => {
      const { version, releaseDate } = result.data;

      if (!isCancelled.current) setIsChecking(false);

      if (!updateDownloaded || version !== updateVersion) {
        await dispatch(updateSettings(SETTINGS_NAME, {
          availableUpdate: true,
          updateVersion: version,
          releaseDate,
          updateDownloaded: false,
          userNotified: true
        }));
        await dispatch(saveSettings(false));
        console.log("wtf");
      }
    });

    ipcRenderer.on("update_not_available", async (event) => {
      if (!isCancelled.current) setIsChecking(false);

      await dispatch(updateSettings(SETTINGS_NAME, {
        availableUpdate: false,
        updateVersion: "",
        releaseDate: "",
        updateDownloaded: false,
        userNotified: false,
        updateFilePath: ""
      }));
      await dispatch(saveSettings(false));
    });

    ipcRenderer.on("downloading_update", (event, result) => {
      if (result.data)
        if (!isCancelled.current) setIsDownloading(true);
    });

    ipcRenderer.on("update_downloaded", async (event, result) => {
      if (!isCancelled.current) setIsDownloading(false);

      await dispatch(updateSettings(SETTINGS_NAME, { updateDownloaded: true, updateFilePath: result.data.downloadedFile }));
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
    }
  }, [abortDownloadHandler]);

  return (props) => <WrappedComponent dateDetails={dateDetails} {...props} />
}