import { TYPES } from '../actions/servicesActions';

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SERVICES_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.SERVICES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case TYPES.SERVICES_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case TYPES.SERVICES_CLEANUP:
      return {
        ...state,
        isFetching: false,
        status: "",
        error: "",
        data: {}
      }
    case TYPES.SERVICES_START_SERVICE: {
      const { serviceName } = action;
      return {
        ...state,
        data: {
          ...state.data,
          [serviceName]: {
            ...state.data[serviceName],
            enabled: true
          }
        }
      }
    }
    case TYPES.SERVICES_STOP_SERVICE: {
      const { serviceName } = action;
      return {
        ...state,
        data: {
          ...state.data,
          [serviceName]: {
            ...state.data[serviceName],
            enabled: false
          }
        }
      }
    }
    case TYPES.SERVICES_UPDATE: {
      const dataCopy = {
        ...state.data,
        ...action.data
      }
      return {
        ...state,
        data: dataCopy
      }
    }
    default: return state;
  }
}