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