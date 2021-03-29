import { TYPES } from '../actions/budgetExecutionsActions';
import { initStateV2 } from '../reducers/util/util';

function setState(buildingName, state, newState) {
  return {
    ...state,
    [buildingName]: {
      ...state[buildingName],
      ...newState
    }
  }
}

export default function createBudgetExecutionReducer(buildings) {

  const initialState = initStateV2(buildings, {
    isFetching: false,
    status: "",
    error: "",
    data: [],
    date: {
      quarter: "",
      year: ""
    }
  });

  return (state = initialState, action) => {
    const buildingNameEng = action.buildingNameEng;

    switch (action.type) {
      case TYPES.BUDGET_EXECUTIONS_RECEIVE:
        return setState(buildingNameEng, state, {
          isFetching: false,
          status: "success",
          data: action.data
        });
      case TYPES.BUDGET_EXECUTIONS_REQUEST:
        return setState(buildingNameEng, state, {
          isFetching: true
        });
      case TYPES.BUDGET_EXECUTIONS_UPDATE:
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
      case TYPES.BUDGET_EXECUTIONS_ADD: {
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
      case TYPES.BUDGET_EXECUTIONS_DELETE: {
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
      case TYPES.BUDGET_EXECUTIONS_FETCHING_FAILED:
        return setState(buildingNameEng, state, {
          status: "error",
          error: action.error
        });
      case TYPES.BUDGET_EXECUTIONS_UPDATE_DATE:
        return setState(buildingNameEng, state, {
          date: action.date
        });
      case TYPES.BUDGET_EXECUTIONS_CLEANUP:
        {
          let stateCopy = { ...state };
          delete stateCopy[buildingNameEng];

          return stateCopy;
        }
      default: return state;
    }
  };

}