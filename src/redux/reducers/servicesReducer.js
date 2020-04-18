import { TYPES } from '../actions/servicesActions';

const initState = {
  isFetching: true,
  status: "",
  error: "",
  data: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.SERVICES_CLEANUP:
      return {
        ...state,
        isFetching: false,
        status: "",
        error: "",
        data: []
      }
    case TYPES.SERVICES_START_SERVICE: {
      const { serviceName } = action;
      const service = { ...state.data[serviceName] };
      console.log(state.data);
      if (service.serviceName === action.serviceName)
        service.enabled = true;

      return {
        ...state,
        data: {
          ...state.data,
          [serviceName]: service
        }
      }
    }
    case TYPES.SERVICES_STOP_SERVICE: {
      const { serviceName } = action;
      const service = { ...state.data[serviceName] };

      if (service.serviceName === action.serviceName)
        service.enabled = false;

      return {
        ...state,
        data: {
          ...state.data,
          [serviceName]: service
        }
      }
    }
    default: return state;
  }
}