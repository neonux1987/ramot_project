import { TYPES } from '../actions/monthExpansesActions';
import { initState } from '../reducers/util/util';

const initialState = initState({
  isFetching: false,
  status: "",
  error: "",
  data: [],
  date: {
    year: "",
    month: "",
    monthHeb: "",
    monthNum: "",
    quarter: ""
  }
});

const setState = (buildingId, state, newState) => {
  return {
    ...state,
    [buildingId]: {
      ...state[buildingId],
      ...newState
    }
  }
}

const monthExpansesRedcuer = (state = initialState, action) => {
  const buildingId = action.buildingId;

  switch (action.type) {
    case TYPES.MONTH_EXPANSES_RECEIVE:
      return setState(buildingId, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.MONTH_EXPANSES_REQUEST:
      return setState(buildingId, state, {
        isFetching: true
      });
    case TYPES.MONTH_EXPANSES_UPDATE:
      {
        const {
          payload,
          index,
          buildingId
        } = action;

        // copy the data
        const dataCopy = [...state[buildingId].data];

        // replace the old object with the updated object
        dataCopy[index] = payload;

        return setState(buildingId, state, {
          data: dataCopy
        });
      }
    case TYPES.MONTH_EXPANSES_ADD: {
      const {
        payload,
        buildingId,
        compareFunc
      } = action;

      // copy the data
      let dataCopy = [...state[buildingId].data];

      //replace the old object with the updated object
      dataCopy.push(payload);

      if (compareFunc) {
        dataCopy = dataCopy.sort(compareFunc);
      }

      return setState(buildingId, state, {
        data: dataCopy
      });
    };
    case TYPES.MONTH_EXPANSES_DELETE: {
      const {
        buildingId,
        index
      } = action;

      // copy the data
      const dataCopy = [...state[buildingId].data];

      //remove from the array
      dataCopy.splice(index, 1);

      return setState(buildingId, state, {
        data: dataCopy
      });
    };
    case TYPES.MONTH_EXPANSES_FETCHING_FAILED:
      return setState(buildingId, state, {
        status: "error",
        error: action.error
      });
    case TYPES.MONTH_EXPANSES_UPDATE_DATE:
      return setState(buildingId, state, {
        date: action.date
      });
    case TYPES.MONTH_EXPANSES_CLEANUP:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingId];

        return stateCopy;
      }
    case TYPES.MONTH_EXPANSES_ADD_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          isFetching: false,
          status: "",
          error: "",
          data: [],
          date: {
            year: "",
            month: "",
            monthHeb: "",
            monthNum: "",
            quarter: ""
          }
        };

        return stateCopy;
      }
    default: return state;
  }
}

export default monthExpansesRedcuer;