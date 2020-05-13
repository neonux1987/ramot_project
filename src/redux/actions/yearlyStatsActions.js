import { ipcSendReceive } from './util/util';

export const TYPES = {
  YEARLY_STATS_REQUEST: "YEARLY_STATS_REQUEST",
  YEARLY_STATS_RECEIVE: "YEARLY_STATS_RECEIVE",
  YEARLY_STATS_FETCHING_FAILED: "YEARLY_STATS_FETCHING_FAILED",
  YEARLY_STATS_CLEANUP: "YEARLY_STATS_CLEANUP"
}

export const fetchYearStats = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestYearlyStats());

    return ipcSendReceive({
      send: {
        channel: "get-year-stats",
        params
      },
      receive: {
        channel: "year-stats"
      },
      onSuccess: result => dispatch(receiveYearlyStats(result.data)),
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

const requestYearlyStats = function (page) {
  return {
    type: TYPES.YEARLY_STATS_REQUEST
  }
};

const receiveYearlyStats = function (data) {
  return {
    type: TYPES.YEARLY_STATS_RECEIVE,
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.YEARLY_STATS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupYearlyStats = () => {
  return {
    type: TYPES.YEARLY_STATS_CLEANUP
  }
}