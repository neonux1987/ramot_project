import { TYPES } from '../actions/summarizedBudgetActions';
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

const summarizedBudgetsRedcuer = (state = initialState, action) => {
  const buildingId = action.buildingId;

  switch (action.type) {
    case TYPES.SUMMARIZED_BUDGETS_RECEIVE:
      return setState(buildingId, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.SUMMARIZED_BUDGETS_REQUEST:
      return setState(buildingId, state, {
        isFetching: true
      });
    case TYPES.SUMMARIZED_BUDGETS_UPDATE:
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
    case TYPES.SUMMARIZED_BUDGETS_DELETE: {
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
    case TYPES.SUMMARIZED_BUDGETS_FETCHING_FAILED:
      return setState(buildingId, state, {
        status: "error",
        error: action.error
      });
    case TYPES.SUMMARIZED_BUDGETS_UPDATE_DATE:
      return setState(buildingId, state, {
        date: action.date
      });
    case TYPES.SUMMARIZED_BUDGETS_CLEANUP:
      {
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          isFetching: false,
          status: "",
          error: "",
          data: [],
          date: {
            month: "",
            year: ""
          }
        };

        return stateCopy;
      }
    default: return state;
  }
}

export default summarizedBudgetsRedcuer;