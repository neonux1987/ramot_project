import { ipcSendReceive } from './util/util';

export const TYPES = {
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
        channel: "get-buildings"
      },
      receive: {
        channel: "buildings-data"
      },
      onSuccess: result => dispatch(receiveBuildings(result.data)),
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

export const updateBuilding = (id, payload) => {

  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "update-building",
        params: { id, payload }
      },
      receive: {
        channel: "updated-bulding"
      }
    });

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