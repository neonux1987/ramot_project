import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

// TYPES
export const TYPES = {
  SERVICES_REQUEST: "SERVICES_REQUEST",
  SERVICES_RECEIVE: "SERVICES_RECEIVE",
  SERVICES_FETCHING_FAILED: "SERVICES_FETCHING_FAILED",
  SERVICES_CLEANUP: "SERVICES_CLEANUP",
  SERVICES_START_SERVICE: "SERVICES_START_SERVICE",
  SERVICES_STOP_SERVICE: "SERVICES_STOP_SERVICE"
}

export const startService = (serviceName) => {
  return dispatch => {
    //request request to backend to get the data
    ipcRenderer.send("start-service", serviceName);
    //listen when the data comes back
    return ipcRenderer.once("service-started", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
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
    //request request to backend to get the data
    ipcRenderer.send("stop-service", serviceName);
    //listen when the data comes back
    return ipcRenderer.once("service-stopped", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
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

export const startServiceStore = (serviceName) => {
  return {
    type: TYPES.SERVICES_START_SERVICE,
    serviceName,
    enable: true
  }
}

export const stopServiceStore = (serviceName) => {
  return {
    type: TYPES.SERVICES_STOP_SERVICE,
    serviceName,
    enable: true
  }
}

export const cleanupServices = () => {
  return {
    type: TYPES.SERVICES_CLEANUP
  }
}