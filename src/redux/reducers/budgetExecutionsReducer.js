import { TYPES } from '../actions/budgetExecutionsActions';
import { initState } from '../reducers/util/util';

const initialState = initState({
  isFetching: false,
  status: "",
  error: "",
  data: [],
  date: {
    quarter: "",
    year: ""
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

const budgetExecutionsReducer = (state = initialState, action) => {
  const buildingId = action.buildingId;

  switch (action.type) {
    case TYPES.BUDGET_EXECUTIONS_RECEIVE:
      return setState(buildingId, state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.BUDGET_EXECUTIONS_REQUEST:
      return setState(buildingId, state, {
        isFetching: true
      });
    case TYPES.BUDGET_EXECUTIONS_UPDATE:
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
    case TYPES.BUDGET_EXECUTIONS_ADD: {
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
    case TYPES.BUDGET_EXECUTIONS_DELETE: {
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
    case TYPES.BUDGET_EXECUTIONS_FETCHING_FAILED:
      return setState(buildingId, state, {
        status: "error",
        error: action.error
      });
    case TYPES.BUDGET_EXECUTIONS_UPDATE_DATE:
      return setState(buildingId, state, {
        date: action.date
      });
    case TYPES.BUDGET_EXECUTIONS_CLEANUP:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingId];

        return stateCopy;
      }
    case TYPES.BUDGET_EXECUTIONS_ADD_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        stateCopy[buildingId] = {
          isFetching: false,
          status: "",
          error: "",
          data: [],
          date: {
            quarter: "",
            year: ""
          }
        };

        return stateCopy;
      }
    case TYPES.BUDGET_EXECUTIONS_REMOVE_BUILDING_STATE:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingId];
        console.log(stateCopy);
        return stateCopy;
      }
    default: return state;
  }
}

export default budgetExecutionsReducer;