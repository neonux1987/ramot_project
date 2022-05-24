import { ipcSendReceive } from './util/util';

export const TYPES = {
  HOME_YEARLY_STATS_REQUEST: "HOME_YEARLY_STATS_REQUEST",
  HOME_YEARLY_STATS_RECEIVE: "HOME_YEARLY_STATS_RECEIVE",
  HOME_YEARLY_STATS_FETCHING_FAILED: "HOME_YEARLY_STATS_FETCHING_FAILED",
  HOME_YEARLY_STATS_CLEANUP: "HOME_YEARLY_STATS_CLEANUP",
}

export const fetchAllBuildingsStatsByYear = (year) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestAllBuildingsYearlyStats());

    return ipcSendReceive({
      send: {
        channel: "get-all-buildings-stats-by-year",
        params: year
      },
      receive: {
        channel: "all-buildings-stats-by-year-data"
      },
      onSuccess: result => {
        dispatch(receiveAllBuildingsYearlyStats(result.data))
      },
      onError: result => dispatch(fetchingAllBuildingsYearlyStatsFailed(result.error))
    });

  }
};

const requestAllBuildingsYearlyStats = function () {
  return {
    type: TYPES.HOME_YEARLY_STATS_REQUEST
  }
};

const receiveAllBuildingsYearlyStats = function (data) {
  return {
    type: TYPES.HOME_YEARLY_STATS_RECEIVE,
    data
  }
};

const fetchingAllBuildingsYearlyStatsFailed = function (error) {
  return {
    type: TYPES.HOME_YEARLY_STATS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupAllBuildingsYearlyStats = () => {
  return {
    type: TYPES.HOME_YEARLY_STATS_CLEANUP
  }
}