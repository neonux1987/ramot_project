import { ipcSendReceive } from "./util/util";

export const TYPES = {
  TOP_CHART_REQUEST: "TOP_CHART_REQUEST",
  TOP_CHART_RECEIVE: "TOP_CHART_RECEIVE",
  TOP_CHART_FETCHING_FAILED: "TOP_CHART_FETCHING_FAILED",
  TOP_CHART_UPDATE_DATE: "TOP_CHART_UPDATE_DATE"
}

export const fetchTopIncomeOutcome = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(request(params.buildingId));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets-top-income-outcome",
        params
      },
      receive: {
        channel: "summarized-budgets-top-income-outcome-data"
      },
      onSuccess: result => dispatch(receive(result.data, params.date, params.buildingId)),
      onError: result => dispatch(fetchingFailed(result.error, params.buildingId))
    });

  }
};

const request = function (buildingId) {
  return {
    type: TYPES.TOP_CHART_REQUEST,
    buildingId
  }
};

const receive = function (data, date, buildingId) {
  return {
    type: TYPES.TOP_CHART_RECEIVE,
    data,
    date,
    buildingId
  }
}

const fetchingFailed = function (error, buildingId) {
  return {
    type: TYPES.TOP_CHART_FETCHING_FAILED,
    payload: error,
    buildingId
  }
};

export const updateDate = (buildingId, date) => {
  return {
    type: TYPES.TOP_CHART_UPDATE_DATE,
    buildingId,
    date
  }
}

