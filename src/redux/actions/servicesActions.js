import { saveSettings, updateSettings } from './settingsActions';
import { ipcSendReceive } from './util/util';
import { toastManager } from '../../toasts/ToastManager';

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

export const fetchServices = (params = {}) => {
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
            onSuccess: result => {
                dispatch(receiveServices(result.data, params.buildingName));
            },
            onError: result => {
                dispatch(fetchingFailed(result.error));
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
            onError: () => dispatch(stopServiceStore())
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
        const state = getState();

        const services = state.services;
        const servicesDataCopy = { ...services.data };

        dispatch(startServiceStore(serviceName));

        const settingsCopy = { ...state.settings.data };
        const settingsData = settingsCopy[serviceName];

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
                settingsData.enabled = true;
                settingsData.restart_required = false;
                servicesDataCopy[serviceName].enabled = true;
                servicesDataCopy[serviceName].restart_required = false;

                dispatch(saveSettings(false));
                dispatch(updateServices(servicesDataCopy));

                toastManager.success("השירות הופעל בהצלחה.");
            },
            onError: () => {
                // on service falied to start
                // set the service to disabled in store 
                // an set to disabled in the service settings
                dispatch(stopServiceStore(serviceName));

                settingsData.enabled = false;
                settingsData.restart_required = false;
                servicesDataCopy[serviceName].enabled = false;
                servicesDataCopy[serviceName].restart_required = true;

                dispatch(saveSettings(false));
                dispatch(updateServices(servicesDataCopy));
            }
        });

    }
};

export const stopService = (serviceName) => {
    return async (dispatch, getState) => {
        const state = getState();

        const services = state.services;
        const servicesDataCopy = { ...services.data };

        dispatch(stopServiceStore(serviceName));

        const settingsCopy = { ...state.settings.data };
        const settingsData = settingsCopy[serviceName];

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
                settingsData.enabled = false;
                settingsData.restart_required = false;
                servicesDataCopy[serviceName].enabled = false;
                servicesDataCopy[serviceName].restart_required = false;

                dispatch(saveSettings(false));
                dispatch(updateServices(servicesDataCopy));

                toastManager.success("השירות הופסק בהצלחה.");
            },
            onError: () => {
                // on service falied to start
                // set the service to disabled in store 
                // an set to disabled in the service settings
                dispatch(startServiceStore(serviceName));

                settingsData.enabled = true;
                settingsData.restart_required = true;
                servicesDataCopy[serviceName].enabled = true;
                servicesDataCopy[serviceName].restart_required = false;

                dispatch(saveSettings(false));
                dispatch(updateServices(servicesDataCopy));
            }
        });

    }
};

export const restartService = (serviceName) => {
    return (dispatch, getState) => {
        const state = getState();

        const settingsCopy = { ...state.settings.data };
        const settingsData = settingsCopy[serviceName];

        return ipcSendReceive({
            send: {
                channel: "restart-service",
                params: serviceName
            },
            receive: {
                channel: "service-restarted"
            },
            onSuccess: () => {
                settingsData.restart_required = false;
                updateSettings(serviceName, settingsData);
                toastManager.success("השירות אותחל בהצלחה.");
            },
            onError: () => {
                settingsData.restart_required = true;
                updateSettings(serviceName, settingsData);
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
                toastManager.success("השירותים אותחלו בהצלחה וכעט פועלים ברקע.");
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
                toastManager.success("השירותים הופסקו בהצלחה.");
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