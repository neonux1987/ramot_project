import { fetchSettings, saveSettings } from './settingsActions';
import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

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
    //let react know that the fetching is started
    dispatch(requestServices(params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-services",
        params
      },
      receive: {
        channel: "services-data"
      },
      onSuccess: (result) => dispatch(receiveServices(result.data, params.buildingName)),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
    });
  }
};

export const updateServices = (data) => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "update-services",
        params: data
      },
      receive: {
        channel: "services-updated"
      },
      onError: (result) => {
        dispatch(stopServiceStore());

        myToasts.error(result.error);
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
  return async (dispatch, getState) => {
    const services = getState().services;
    const servicesDataCopy = { ...services.data };

    dispatch(startServiceStore(serviceName));

    const settings = await dispatch(fetchSettings(serviceName));
    const settingsCopy = { ...settings };

    return ipcSendReceive({
      send: {
        channel: "start-service",
        params: serviceName
      },
      receive: {
        channel: "service-started"
      },
      onSuccess: () => {
        // on success service was enabled
        // update settings set the service to enabled
        settingsCopy.enabled = true;
        servicesDataCopy[serviceName].enabled = true;
        servicesDataCopy[serviceName].restartRequired = false;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));

        myToasts.success("השירות הופעל בהצלחה.");
      },
      onError: (result) => {
        // on service falied to start
        // set the service to disabled in store 
        // an set to disabled in the service settings
        dispatch(stopServiceStore(serviceName));

        settingsCopy.enabled = false;
        servicesDataCopy[serviceName].enabled = false;
        servicesDataCopy[serviceName].restartRequired = true;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));

        myToasts.error(result.error);
      }
    });

  }
};

export const stopService = (serviceName) => {
  return async (dispatch, getState) => {
    const services = getState().services;
    const servicesDataCopy = { ...services.data };

    dispatch(stopServiceStore(serviceName));

    const settings = await dispatch(fetchSettings(serviceName));
    const settingsCopy = { ...settings };

    return ipcSendReceive({
      send: {
        channel: "stop-service",
        params: serviceName
      },
      receive: {
        channel: "service-stopped"
      },
      onSuccess: () => {
        // on success service was enabled
        // update settings set the service to enabled
        settingsCopy.enabled = false;
        servicesDataCopy[serviceName].enabled = false;
        servicesDataCopy[serviceName].restartRequired = false;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));

        myToasts.success("השירות הופסק בהצלחה.");
      },
      onError: (result) => {
        // on service falied to start
        // set the service to disabled in store 
        // an set to disabled in the service settings
        dispatch(startServiceStore(serviceName));

        settingsCopy.enabled = true;
        servicesDataCopy[serviceName].enabled = true;
        servicesDataCopy[serviceName].restartRequired = false;

        dispatch(saveSettings(serviceName, settingsCopy, false));
        dispatch(updateServices(servicesDataCopy));

        myToasts.error(result.error);
      }
    });

  }
};

export const restartService = (serviceName) => {
  return () => {

    return ipcSendReceive({
      send: {
        channel: "restart-service",
        params: serviceName
      },
      receive: {
        channel: "service-restarted"
      },
      onSuccess: (reult) => {
        myToasts.success("השירות אותחל בהצלחה.");
      },
      onError: (result) => {
        myToasts.error(result.error);
      }
    });

  }
};

export const startAllServices = () => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "start-all-services"
      },
      receive: {
        channel: "all-services-started"
      },
      onSuccess: (reult) => {
        myToasts.success("השירותים אותחלו בהצלחה וכעט פועלים ברקע.");
      },
      onError: (result) => {
        myToasts.error(result.error);
      }
    });

  }
};

export const stopAllServices = () => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "stop-all-services"
      },
      receive: {
        channel: "all-services-stopped"
      },
      onSuccess: (reult) => {
        myToasts.success("השירותים הופסקו בהצלחה.");
      },
      onError: (result) => {
        myToasts.error(result.error);
      }
    });

  }
};

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