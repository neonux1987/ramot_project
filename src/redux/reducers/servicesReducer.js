import { TYPES } from '../actions/servicesActions';

const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
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
      const servicesCopy = [...state.data]

      state.data.forEach((service, index) => {
        if (service.serviceName === action.serviceName)
          servicesCopy[index].enabled = true;
      });

      return {
        ...state,
        data: servicesCopy
      }
    }
    case TYPES.SERVICES_STOP_SERVICE: {
      const servicesCopy = [...state.data]

      state.data.forEach((service, index) => {
        if (service.serviceName === action.serviceName)
          servicesCopy[index].enabled = false;
      });

      return {
        ...state,
        data: servicesCopy
      }
    }
    default: return state;
  }
}