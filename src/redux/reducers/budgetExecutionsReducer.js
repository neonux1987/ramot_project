import { TYPES } from '../actions/monthlyStatsActions';
import { initState } from '../reducers/util/util';

const initialState = initState({
  isFetching: false,
  status: "",
  error: "",
  data: [],
  date: {
    quarter: "",
    year: ""
  },
  pageSettings: {
    count: 0
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

const budgetExecutionsReducer = (state = initialState, action) => {
  const buildingNameEng = action.buildingNameEng;

  switch (action.type) {
    case `BUDGET_EXECUTIONS_RECEIVE`:
      return setState(buildingNameEng, state, {
        isFetching: false,
        status: "success",
        data: action.data,
        pageSettings: action.data.info
      });
    case `BUDGET_EXECUTIONS_REQUEST`:
      return setState(buildingNameEng, state, {
        isFetching: true
      });
    case `BUDGET_EXECUTIONS_UPDATE`:
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
    case `BUDGET_EXECUTIONS_ADD`: {
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

      // copy page settings
      const pageSettingsCopy = { ...state[buildingNameEng].pageSettings };

      // add 1 to the count in page settings
      // the data grew in 1 in the database
      pageSettingsCopy.count += 1;

      return setState(buildingNameEng, state, {
        data: dataCopy,
        pageSettings: pageSettingsCopy
      });
    };
    case `BUDGET_EXECUTIONS_DELETE`: {
      const {
        buildingNameEng,
        index
      } = action;

      // copy the data
      const dataCopy = [...state[buildingNameEng].data];

      //remove from the array
      dataCopy.splice(index, 1);

      // copy page settings
      const pageSettingsCopy = { ...state[buildingNameEng].pageSettings };

      // subtract 1 from the count in page settings
      // the data shrink in 1 in the database
      pageSettingsCopy.count -= 1;

      return setState(buildingNameEng, state, {
        data: dataCopy,
        pageSettings: pageSettingsCopy
      });
    };
    case `BUDGET_EXECUTIONS_FETCHING_FAILED`:
      return setState(buildingNameEng, state, {
        status: "error",
        error: action.error
      });
    case `BUDGET_EXECUTIONS_INIT_STATE`:
      return {
        ...state,
        [buildingNameEng]: {
          isFetching: false,
          status: "",
          error: "",
          data: [],
          date: {
            quarter: "",
            year: ""
          },
          pageSettings: {
            count: 0
          }
        }
      }
    case `BUDGET_EXECUTIONS_CLEANUP`:
      {
        let stateCopy = { ...state };
        delete stateCopy[buildingNameEng];

        return stateCopy;
      }
    default: return state;
  }
}

export default budgetExecutionsReducer;