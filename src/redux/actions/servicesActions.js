import React from 'react';
import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';
import { fetchSettings, saveSettings } from './settingsActions';

// TYPES
export const TYPES = {
  SERVICES_REQUEST: "SERVICES_REQUEST",
  SERVICES_RECEIVE: "SERVICES_RECEIVE",
  SERVICES_UPDATE: "SERVICES_UPDATE",
  SERVICES_FETCHING_FAILED: "SERVICES_FETCHING_FAILED",
  SERVICES_CLEANUP: "SERVICES_CLEANUP",
  SERVICES_START_SERVICE: "SERVICES_START_SERVICE",
  SERVICES_STOP_SERVICE: "SERVICES_STOP_SERVICE"
}

export const fetchServices = (params = Object) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      //let react know that the fetching is started
      dispatch(requestServices(params.buildingName));

      //request request to backend to get the data
      ipcRenderer.send("get-services", params);
      //listen when the data comes back
      return ipcRenderer.once("services-data", (event, arg) => {
        if (arg.error) {
          //let react know that an erro occured while trying to fetch
          dispatch(fetchingFailed(arg.error));
          //send the error to the notification center
          toast.error(arg.error, {
            onOpen: () => playSound(soundTypes.error)
          });
          reject(arg.error);
        } else {
          //success store the data
          dispatch(receiveServices(arg.data, params.buildingName));
          resolve(arg.data);
        }
      });
    });
  }
};

export const updateServices = (data) => {
  return dispatch => {
    //request request to backend to get the data
    ipcRenderer.send("update-services", data);
    //listen when the data comes back
    return ipcRenderer.once("services-updated", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        dispatch(stopServiceStore());
      }
    });
  }
};

export const updateServicesInStore = (data) => {
  return {
    type: TYPES.SERVICES_UPDATE,
    data
  }
}

export const startService = (serviceName) => {
  return (dispatch, getState) => {
    const services = getState().services;
    const servicesDataCopy = { ...services.data };

    dispatch(startServiceStore(serviceName));
    playSound(soundTypes.success);

    //request request to backend to get the data
    ipcRenderer.send("start-service", serviceName);
    //listen when the data comes back
    return ipcRenderer.once("service-started", async (event, arg) => {
      const settings = await dispatch(fetchSettings(serviceName));
      const settingsCopy = { ...settings };

      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        // on service falied to start
        // set the service to disabled in store 
        // an set to disabled in the service settings
        dispatch(stopServiceStore(serviceName));

        settingsCopy.enabled = false;
        servicesDataCopy[serviceName].enabled = false;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));

      } else {
        // on success service was enabled
        // update settings set the service to enabled
        settingsCopy.enabled = true;
        servicesDataCopy[serviceName].enabled = true;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));
      }
    });
  }
};

export const stopService = (serviceName) => {
  return (dispatch, getState) => {
    const services = getState().services;
    const servicesDataCopy = { ...services.data };

    dispatch(stopServiceStore(serviceName));
    playSound(soundTypes.success);

    //request request to backend to get the data
    ipcRenderer.send("stop-service", serviceName);
    //listen when the data comes back
    return ipcRenderer.once("service-stopped", async (event, arg) => {
      const settings = await dispatch(fetchSettings(serviceName));
      const settingsCopy = { ...settings };

      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        // on service falied to start
        // set the service to disabled in store 
        // an set to disabled in the service settings
        dispatch(startServiceStore(serviceName));

        settingsCopy.enabled = true;
        servicesDataCopy[serviceName].enabled = true;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));
      } else {
        // on success service was enabled
        // update settings set the service to enabled
        settingsCopy.enabled = false;
        servicesDataCopy[serviceName].enabled = false;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));
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

export const requestServices = function (page) {
  return {
    type: TYPES.SERVICES_REQUEST,
    page
  }
};

export const receiveServices = function (data, page) {
  return {
    type: TYPES.SERVICES_RECEIVE,
    data,
    page
  }
}

export const fetchingFailed = function (error) {
  return {
    type: TYPES.SERVICES_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupServices = () => {
  return {
    type: TYPES.SERVICES_CLEANUP
  }
}