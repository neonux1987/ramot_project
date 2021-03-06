import ToastRender from '../components/ToastRender/ToastRender';
import { soundManager } from '../soundManager/SoundManager';
import { toastManager } from '../toasts/toastManager';

// ELECTRON
const ipcRenderer = require('electron').ipcRenderer;

const TOAST_AUTO_CLOSE = 3000;
const TOAST_BACKUP_ID = "dbBackupSvc";
const TOAST_REPORTS_ID = "reportsGeneratorId";

const useServices = () => {

  const start = () => {
    // start services
    startServices();

    // setup listeners
    setupListeners();
  }

  const startServices = () => {
    //listen when the data comes back
    ipcRenderer.on("services-started", () => {
      //hello
    });

    //start services
    ipcRenderer.send("system-start-services");
  }

  const setupListeners = () => {

    const listenerCallback = (event, action, message) => {
      switch (action) {
        case "dbBackupStarted":
          toastManager.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false,
            toastId: TOAST_BACKUP_ID
          });
          break;
        case "dbBackupFinished":
          toastManager.update(TOAST_BACKUP_ID, {
            render: <ToastRender done={true} message={message} />,
            type: toastManager.types.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "dbBackupError":
          toastManager.update(TOAST_BACKUP_ID, {
            render: <ToastRender done={true} message={message} />,
            type: toastManager.types.ERROR,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "reportsGenerationStarted":
          toastManager.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false,
            toastId: TOAST_REPORTS_ID
          });
          break;
        case "reportsGenerationFinished":
          toastManager.update(TOAST_REPORTS_ID, {
            render: <ToastRender done={true} message={message} />,
            type: toastManager.types.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "systemError":
          toastManager.error(message);
          break;
        default: return null;
      }
    };

    // when the state updates it re-runs useEffect again
    // to avoid multiple register of of the same event
    // unregister all events
    ipcRenderer.removeAllListeners("notify-renderer");

    //listen when the data comes back
    ipcRenderer.on("notify-renderer", listenerCallback);
  }

  return [start];
};

export default useServices;