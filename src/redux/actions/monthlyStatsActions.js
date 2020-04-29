import { myToasts } from '../../CustomToasts/myToasts';
import { ipcSendReceive } from './util/util';

export const TYPES = {
  REQUEST_MONTHLY_STATS: "REQUEST_MONTHLY_STATS",
  RECEIVE_MONTHLY_STATS: "RECEIVE_MONTHLY_STATS",
  MONTHLY_STATS_FETCHING_FAILED: "MONTHLY_STATS_FETCHING_FAILED",
  CLEANUP_MONTHLY_STATS: "CLEANUP_MONTHLY_STATS",
  UPDATE_MONTH_STATS_STORE_ONLY: "UPDATE_MONTH_STATS_STORE_ONLY"
}

export const fetchAllMonthsStatsByQuarter = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestMonthlyStats());

    return ipcSendReceive({
      send: {
        channel: "get-all-months-stats-by-quarter",
        params
      },
      receive: {
        channel: "all-months-stats-by-quarter"
      },
      onSuccess: (result) => dispatch(receiveMonthlyStats(result.data)),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
    });

  }
};

export const updateMonthStatsStoreOnly = (monthStatsObj, index) => {
  return dispatch => {
    dispatch({
      type: TYPES.UPDATE_MONTH_STATS_STORE_ONLY,
      monthStatsObj,
      index
    });
  }
}

const requestMonthlyStats = function (page) {
  return {
    type: TYPES.REQUEST_MONTHLY_STATS
  }
};

const receiveMonthlyStats = function (data) {
  return {
    type: TYPES.RECEIVE_MONTHLY_STATS,
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.MONTHLY_STATS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupMonthlyStats = () => {
  return {
    type: TYPES.CLEANUP_MONTHLY_STATS
  }
}