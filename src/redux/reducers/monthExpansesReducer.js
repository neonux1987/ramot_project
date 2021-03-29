import { TYPES } from '../actions/monthExpansesActions';
import { initState } from '../reducers/util/util';

const initialState = initState({
  isFetching: false,
  status: "",
  error: "",
  data: [],
  date: {
    month: "",
    year: ""
  }
});

const setState = (buildingName, state, newState) => {
  return {
    ...state,
    [buildingName]: {
      ...state[buildingName],
      ...newState
    }
  }
}

const monthExpansesRedcuer = (state = initialState, action) => {
  const buildingNameEng = action.buildingNameEng;

  switch (action.type) {
    case TYPES.MONTH_EXPANSES_RECEIVE:
      return setState(buildingNameEng, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.MONTH_EXPANSES_REQUEST:
      return setState(buildingNameEng, state, {
        isFetching: true
      });
    case TYPES.MONTH_EXPANSES_UPDATE:
      {
        const {
          payload,
          index,
          buildingNameEng
        } = action;

        // copy the data
        const dataCopy = [...state[buildingNameEng].data];

        // replace the old object with the updated object
        dataCopy[index] = payload;

        return setState(buildingNameEng, state, {
          data: dataCopy
        });
      }
    case TYPES.MONTH_EXPANSES_ADD: {
      const {
        payload,
        buildingNameEng,
        compareFunc
      } = action;

      // copy the data
      let dataCopy = [...state[buildingNameEng].data];

      //replace the old object with the updated object
      dataCopy.push(payload);

      if (compareFunc) {
        dataCopy = dataCopy.sort(compareFunc);
      }

      return setState(buildingNameEng, state, {
        data: dataCopy
      });
    };
    case TYPES.MONTH_EXPANSES_DELETE: {
      const {
        buildingNameEng,
        index
      } = action;

      // copy the data
      const dataCopy = [...state[buildingNameEng].data];

      //remove from the array
      dataCopy.splice(index, 1);

      return setState(buildingNameEng, state, {
        data: dataCopy
      });
    };
    case TYPES.MONTH_EXPANSES_FETCHING_FAILED:
      return setState(buildingNameEng, state, {
        status: "error",
        error: action.error
      });
    case TYPES.MONTH_EXPANSES_UPDATE_DATE:
      return setState(buildingNameEng, state, {
        date: action.date
      });
    case TYPES.MONTH_EXPANSES_CLEANUP:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingNameEng];

        return stateCopy;
      }
    default: return state;
  }
}

export default monthExpansesRedcuer;