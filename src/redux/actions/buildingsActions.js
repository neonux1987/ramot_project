import { toastManager } from '../../toasts/toastManager';
import { ipcSendReceive } from './util/util';
import { showSavedNotification } from './savedNotificationActions';
import { addBuildingState as be_ADD } from './budgetExecutionsActions';
import { addBuildingState as me_ADD } from './monthExpansesActions';
import { addBuildingState as sb_ADD } from './summarizedBudgetActions';
import { addBuildingState as ms_ADD } from './monthlyStatsActions';
import { addBuildingState as qs_ADD } from './quarterlyStatsActions';
import { addBuildingState as ys_ADD } from './yearlyStatsActions';
import { addBuildingState as rm_ADD } from './registeredMonthsActions';
import { addBuildingState as rq_ADD } from './registeredQuartersActions';
import { addBuildingState as ry_ADD } from './registeredYearsActions';
import { addBuildingState as mc_ADD } from './monthsChartAction';
import { addBuildingState as qc_ADD } from './quartersChartActions';
import { addBuildingState as yc_ADD } from './yearsChartActions';
import { addBuildingState as tc_ADD } from './topChartActions';


export const TYPES = {
  BUILDINGS_UPDATE: "BUILDINGS_UPDATE",
  BUILDINGS_ADD: "BUILDINGS_ADD",
  BUILDINGS_REQUEST: "BUILDINGS_REQUEST",
  BUILDINGS_RECEIVE: "BUILDINGS_RECEIVE",
  BUILDINGS_FETCHING_FAILED: "BUILDINGS_FETCHING_FAILED"
}


export const fetchBuildings = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestBuildings());

    return ipcSendReceive({
      send: {
        channel: "get-all-buildings"
      },
      receive: {
        channel: "all-buildings-data"
      },
      onSuccess: result => dispatch(receiveBuildings(result.data)),
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

export const updateBuilding = (id, payload, oldCopy, index) => {

  return dispatch => {

    // save previous name
    if (payload.buildingName && payload.buildingName !== oldCopy.buildingName)
      payload.previousBuildingName = oldCopy.buildingName;

    dispatch(updateBuildingsInStore(index, payload));

    return ipcSendReceive({
      send: {
        channel: "update-building",
        params: { id, payload }
      },
      receive: {
        channel: "updated-building"
      },
      onSuccess: () => dispatch(showSavedNotification()),
      onError: result => {
        dispatch(updateBuildingsInStore(oldCopy));
        toastManager.error(result.error);
      }
    });

  }
};

export const addBuilding = (payload) => {
  return dispatch => {
    return ipcSendReceive({
      send: {
        channel: "add-building",
        params: payload
      },
      receive: {
        channel: "added-building"
      },
      onSuccess: result => {
        console.log(result);
        dispatch(addBuildingsInStore(result.data));
        const { buildingId } = result.data;

        // init state
        dispatch(me_ADD(buildingId));
        dispatch(be_ADD(buildingId));
        dispatch(sb_ADD(buildingId));
        dispatch(ms_ADD(buildingId));
        dispatch(qs_ADD(buildingId));
        dispatch(ys_ADD(buildingId));
        dispatch(rm_ADD(buildingId));
        dispatch(rq_ADD(buildingId));
        dispatch(ry_ADD(buildingId));
        dispatch(mc_ADD(buildingId));
        dispatch(qc_ADD(buildingId));
        dispatch(yc_ADD(buildingId));
        dispatch(tc_ADD(buildingId));

      },
      onError: result => {
        toastManager.error(result.error);
      }
    });

  }
};

const updateBuildingsInStore = function (index, payload) {
  return {
    type: TYPES.BUILDINGS_UPDATE,
    index,
    payload
  }
};

const addBuildingsInStore = function (index, payload) {
  return {
    type: TYPES.BUILDINGS_ADD,
    payload
  }
};

const requestBuildings = function () {
  return {
    type: TYPES.BUILDINGS_REQUEST
  }
};

const receiveBuildings = function (data) {
  return {
    type: TYPES.BUILDINGS_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.BUILDINGS_FETCHING_FAILED,
    error
  }
};