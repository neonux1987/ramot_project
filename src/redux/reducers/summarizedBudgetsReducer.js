import { TYPES } from '../actions/summarizedBudgetActions';
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

export default function createSummarizedBudgetsRedcuer(buildings) {

  const initialState = initStateV2(buildings, {
    isFetching: false,
    status: "",
    error: "",
    data: [],
    date: {
      month: "",
      year: ""
    }
  });

  return (state = initialState, action) => {
    const buildingNameEng = action.buildingNameEng;

    switch (action.type) {
      case TYPES.SUMMARIZED_BUDGETS_RECEIVE:
        return setState(buildingNameEng, state, {
          isFetching: false,
          status: "success",
          data: action.data
        });
      case TYPES.SUMMARIZED_BUDGETS_REQUEST:
        return setState(buildingNameEng, state, {
          isFetching: true
        });
      case TYPES.SUMMARIZED_BUDGETS_UPDATE:
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
      case TYPES.SUMMARIZED_BUDGETS_DELETE: {
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
      case TYPES.SUMMARIZED_BUDGETS_FETCHING_FAILED:
        return setState(buildingNameEng, state, {
          status: "error",
          error: action.error
        });
      case TYPES.SUMMARIZED_BUDGETS_UPDATE_DATE:
        return setState(buildingNameEng, state, {
          date: action.date
        });
      case TYPES.SUMMARIZED_BUDGETS_CLEANUP:
        {
          let stateCopy = { ...state };
          stateCopy[buildingNameEng] = {
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
  };
}