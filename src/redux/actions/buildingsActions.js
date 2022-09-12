import { batch } from "react-redux";
import { toastManager } from "../../toasts/toastManager";
import { ipcSendReceive } from "./util/util";
import {
  addBuilding as be_ADD,
  removeBuilding as be_REMOVE
} from "./budgetExecutionsActions";
import {
  addBuilding as me_ADD,
  removeBuilding as me_REMOVE
} from "./monthExpansesActions";
import {
  addBuilding as sb_ADD,
  removeBuilding as sb_REMOVE
} from "./summarizedBudgetActions";
import {
  addBuilding as ms_ADD,
  removeBuilding as ms_REMOVE
} from "./monthlyStatsActions";
import {
  addBuilding as qs_ADD,
  removeBuilding as qs_REMOVE
} from "./quarterlyStatsActions";
import {
  addBuilding as ys_ADD,
  removeBuilding as ys_REMOVE
} from "./yearlyStatsActions";
import {
  addBuilding as rm_ADD,
  removeBuilding as rm_REMOVE
} from "./registeredMonthsActions";
import {
  addBuilding as rq_ADD,
  removeBuilding as rq_REMOVE
} from "./registeredQuartersActions";
import {
  addBuilding as ry_ADD,
  removeBuilding as ry_REMOVE
} from "./registeredYearsActions";
import {
  addBuilding as mc_ADD,
  removeBuilding as mc_REMOVE
} from "./monthsChartAction";
import {
  addBuilding as qc_ADD,
  removeBuilding as qc_REMOVE
} from "./quartersChartActions";
import {
  addBuilding as yc_ADD,
  removeBuilding as yc_REMOVE
} from "./yearsChartActions";
import {
  addBuilding as tc_ADD,
  removeBuilding as tc_REMOVE
} from "./topChartActions";
import {
  addBuilding as s_ADD,
  removeBuilding as s_REMOVE
} from "./statisticsActions";
import { updateGlobalBuilding } from "../reducers/util/util";

export const TYPES = {
  BUILDINGS_UPDATE: "BUILDINGS_UPDATE",
  BUILDINGS_ADD: "BUILDINGS_ADD",
  BUILDINGS_REMOVE: "BUILDINGS_REMOVE",
  BUILDINGS_REQUEST: "BUILDINGS_REQUEST",
  BUILDINGS_RECEIVE: "BUILDINGS_RECEIVE",
  BUILDINGS_FETCHING_FAILED: "BUILDINGS_FETCHING_FAILED"
};

export const fetchBuildings = () => {
  return (dispatch) => {
    //let react know that the fetching is started
    dispatch(requestBuildings());

    return ipcSendReceive({
      send: {
        channel: "get-all-buildings"
      },
      receive: {
        channel: "all-buildings-data"
      },
      onSuccess: (result) => dispatch(receiveBuildings(result.data)),
      onError: (result) => dispatch(fetchingFailed(result.error))
    });
  };
};

export const updateBuilding = (id, payload, oldCopy, index) => {
  return (dispatch) => {
    // save previous name
    if (payload.buildingName && payload.buildingName !== oldCopy.buildingName)
      payload.previousBuildingName = oldCopy.buildingName;

    dispatch(updateBuildingsInStore(index, payload));
    const updatedBuildings = updateGlobalBuilding(id, payload);
    localStorage.getItem("buildings", JSON.stringify(updatedBuildings));

    return ipcSendReceive({
      send: {
        channel: "update-building",
        params: { id, payload }
      },
      receive: {
        channel: "updated-building"
      },
      onError: (result) => {
        dispatch(updateBuildingsInStore(oldCopy));

        const updatedBuildings = updateGlobalBuilding(id, payload);
        localStorage.getItem("buildings", JSON.stringify(updatedBuildings));

        toastManager.error(result.error);
      }
    });
  };
};

export const addBuilding = (payload) => {
  return (dispatch) => {
    return ipcSendReceive({
      send: {
        channel: "add-building",
        params: payload
      },
      receive: {
        channel: "added-building"
      },
      onSuccess: (result) => {
        dispatch(addBuildingsInStore(result.data));
        const { id } = result.data;

        batch(() => {
          // init state
          dispatch(me_ADD(id));
          dispatch(be_ADD(id));
          dispatch(sb_ADD(id));
          dispatch(ms_ADD(id));
          dispatch(qs_ADD(id));
          dispatch(ys_ADD(id));
          dispatch(rm_ADD(id));
          dispatch(rq_ADD(id));
          dispatch(ry_ADD(id));
          dispatch(mc_ADD(id));
          dispatch(qc_ADD(id));
          dispatch(yc_ADD(id));
          dispatch(tc_ADD(id));
          dispatch(s_ADD(id));
        });

        // we also need to add the new building to the global
        // shared object, otherwise on refresh it will use the
        // global shared object of previous data
        const buildings = JSON.parse(localStorage.getItem("buildings"));
        buildings.push(result.data);
        localStorage.setItem("buildings", JSON.stringify(buildings));
      },
      onError: (result) => {
        toastManager.error(result.error);
      }
    });
  };
};

export const removeBuildings = (buildingsToRemove) => {
  return (dispatch) => {
    return ipcSendReceive({
      send: {
        channel: "remove-buildings",
        params: buildingsToRemove
      },
      receive: {
        channel: "buildings-removed"
      },
      onSuccess: () => {
        const buildings = JSON.parse(localStorage.getItem("buildings"));

        buildingsToRemove.forEach(({ id }) => {
          dispatch(removeBuildingInStore(id));

          batch(() => {
            // remove state
            dispatch(me_REMOVE(id));
            dispatch(be_REMOVE(id));
            dispatch(sb_REMOVE(id));
            dispatch(ms_REMOVE(id));
            dispatch(qs_REMOVE(id));
            dispatch(ys_REMOVE(id));
            dispatch(rm_REMOVE(id));
            dispatch(rq_REMOVE(id));
            dispatch(ry_REMOVE(id));
            dispatch(mc_REMOVE(id));
            dispatch(qc_REMOVE(id));
            dispatch(yc_REMOVE(id));
            dispatch(tc_REMOVE(id));
            dispatch(s_REMOVE(id));
          });

          // we also need to remove the buildings from the global
          // shared object, otherwise on refresh it will use the
          // global shared object of previous data
          buildings.forEach((building, index) => {
            if (id === building.id) buildings.splice(index, 1);
          });
        });

        localStorage.getItem("buildings", JSON.stringify(buildings));

        toastManager.success("הבניינים נמחקו לצמיתות בהצלחה");
      },
      onError: (result) => {
        toastManager.error(result.error);
      }
    });
  };
};

const updateBuildingsInStore = function (index, payload) {
  return {
    type: TYPES.BUILDINGS_UPDATE,
    index,
    payload
  };
};

const addBuildingsInStore = function (payload) {
  return {
    type: TYPES.BUILDINGS_ADD,
    payload
  };
};

const removeBuildingInStore = function (id) {
  return {
    type: TYPES.BUILDINGS_REMOVE,
    id
  };
};

const requestBuildings = function () {
  return {
    type: TYPES.BUILDINGS_REQUEST
  };
};

const receiveBuildings = function (data) {
  return {
    type: TYPES.BUILDINGS_RECEIVE,
    data: data
  };
};

const fetchingFailed = function (error) {
  return {
    type: TYPES.BUILDINGS_FETCHING_FAILED,
    error
  };
};
