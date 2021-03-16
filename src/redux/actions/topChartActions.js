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
    dispatch(request(params.buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-summarized-budgets-top-income-outcome",
        params
      },
      receive: {
        channel: "summarized-budgets-top-income-outcome-data"
      },
      onSuccess: result => dispatch(receive(result.data, params.date, params.buildingNameEng)),
      onError: result => dispatch(fetchingFailed(result.error, params.buildingNameEng))
    });

  }
};

const request = function (buildingNameEng) {
  return {
    type: TYPES.TOP_CHART_REQUEST,
    buildingNameEng
  }
};

const receive = function (data, date, buildingNameEng) {
  return {
    type: TYPES.TOP_CHART_RECEIVE,
    data,
    date,
    buildingNameEng
  }
}

const fetchingFailed = function (error, buildingNameEng) {
  return {
    type: TYPES.TOP_CHART_FETCHING_FAILED,
    payload: error,
    buildingNameEng
  }
};

export const updateDate = (buildingNameEng, date) => {
  return {
    type: TYPES.TOP_CHART_UPDATE_DATE,
    buildingNameEng,
    date
  }
}

