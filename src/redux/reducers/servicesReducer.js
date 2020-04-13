import { TYPES } from '../actions/servicesActions';

const initState = {
  isFetching: false,
  status: "",
  error: "",
  services: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SERVICES_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        services: action.data
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
        services: []
      }
    case TYPES.SERVICES_START_SERVICE: {
      const servicesCopy = [...state.services]

      state.services.forEach((service, index) => {
        if (service.serviceName === action.serviceName)
          servicesCopy[index].enabled = true;
      });

      return {
        ...state,
        services: servicesCopy
      }
    }
    case TYPES.SERVICES_STOP_SERVICE: {
      const servicesCopy = [...state.services]

      state.services.forEach((service, index) => {
        if (service.serviceName === action.serviceName)
          servicesCopy[index].enabled = false;
      });

      return {
        ...state,
        services: servicesCopy
      }
    }
    default: return state;
  }
}