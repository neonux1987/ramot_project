import React from 'react';
import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

// TYPES
export const TYPES = {
  SERVICES_FETCHING_FAILED: "SERVICES_FETCHING_FAILED",
  SERVICES_CLEANUP: "SERVICES_CLEANUP",
  SERVICES_START_SERVICE: "SERVICES_START_SERVICE",
  SERVICES_STOP_SERVICE: "SERVICES_STOP_SERVICE"
}

export const startService = (serviceName) => {
  return dispatch => {
    dispatch(startServiceStore());
    //request request to backend to get the data
    //ipcRenderer.send("start-service", serviceName);
    //listen when the data comes back
    return ipcRenderer.once("service-started", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        dispatch(stopServiceStore());
      } else {
        //success
        toast.success("השירות הופעל בהצלחה.", {
          onOpen: () => playSound(soundTypes.success)
        });
      }
    });
  }
};

export const stopService = (serviceName) => {
  return dispatch => {
    dispatch(startServiceStore());

    //request request to backend to get the data
    //ipcRenderer.send("stop-service", serviceName);
    //listen when the data comes back
    return ipcRenderer.once("service-stopped", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        dispatch(stopServiceStore());
      } else {
        //success
        toast.success("השירות בוטל בהצלחה.", {
          onOpen: () => playSound(soundTypes.success)
        });
      }
    });
  }
};

export const restartService = (serviceName) => {
  return dispatch => {
    //request request to backend to get the data
    ipcRenderer.send("restart-service", serviceName);
    //listen when the data comes back
    return ipcRenderer.once("service-restarted", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("השירות אותחל בהצלחה.", {
          onOpen: () => playSound(soundTypes.success)
        });
      }
    });
  }
};

export const startAllServices = () => {
  return dispatch => {
    //request request to backend to get the data
    ipcRenderer.send("start-all-services");
    //listen when the data comes back
    return ipcRenderer.once("all-services-started", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("השירותים אותחלו בהצלחה וכעט פועלים ברקע.", {
          onOpen: () => playSound(soundTypes.success)
        });
      }
    });
  }
};

export const stopAllServices = () => {
  return dispatch => {
    //request request to backend to get the data
    ipcRenderer.send("stop-all-services");
    //listen when the data comes back
    return ipcRenderer.once("all-services-stopped", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success
        toast.success("השירותים הופסקו בהצלחה.", {
          onOpen: () => playSound(soundTypes.success)
        });
      }
    });
  }
};

export const dbIndependentBackup = (fullPath) => {
  return dispatch => {
    //backup started message
    const toastId = toast.info(<ToastRender spinner={true} message={"מתבצע כעת גיבוי בסיס נתונים..."} />, {
      autoClose: false,
      onOpen: () => playSound(soundTypes.message)
    });
    //send a request to backend to get the data
    ipcRenderer.send("db-independent-backup", fullPath);
    //listen when the data comes back
    ipcRenderer.once("db-independently-backed-up", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //send the error to the notification center
        toast.success(<ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה."} />, {
          delay: 2000,
          autoClose: 3000,
          onOpen: () => {
            toast.dismiss(toastId);
            playSound(soundTypes.message)
          }
        });
      }
    });
  }
}

export const startServiceStore = (serviceName) => {
  return {
    type: TYPES.SERVICES_START_SERVICE,
    serviceName
  }
}

export const stopServiceStore = (serviceName) => {
  return {
    type: TYPES.SERVICES_STOP_SERVICE,
    serviceName
  }
}

export const cleanupServices = () => {
  return {
    type: TYPES.SERVICES_CLEANUP
  }
}