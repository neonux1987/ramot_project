import Helper from '../../helpers/Helper';
import { TYPES } from '../actions/monthExpansesActions';
import { setPageState, commonAdd, commonDelete } from './util/util';

const initState = {
  pageName: "monthExpanses",
  headerTitle: "מעקב הוצאות חודשיות",
  pages: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.RECEIVE_MONTH_EXPANSES:
      return setPageState(state, action.buildingName, {
        date: action.date,
        isFetching: false,
        status: "success",
        data: action.data.data,
        pageSettings: action.data.info
      });
    case TYPES.REQUEST_MONTH_EXPANSES:
      return setPageState(state, action.buildingName, {
        isFetching: true
      });
    case TYPES.UPDATE_MONTH_EXPANSE:
      {
        const {
          expanse,
          index,
          buildingName
        } = action;

        // copy the data
        const dataCopy = { ...state.pages[buildingName].data };

        // replace the old object with the updated object
        dataCopy[index] = expanse;

        return setPageState(state, action.buildingName, {
          data: dataCopy
        });
      }
    case TYPES.ADD_MONTH_EXPANSE: commonAdd(state, action);
    case TYPES.DELETE_MONTH_EXPANSE: commonDelete(state, action);
    case TYPES.MONTH_EXPANSES_FETCHING_FAILED:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.buildingName]: {
            ...state.pages[action.buildingName],
            status: "error",
            error: action.error
          }
        }
      }
    case TYPES.INIT_MONTH_EXPANSES_STATE:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.buildingName]: {
            date: Helper.getCurrentDate(),
            isFetching: false,
            status: "",
            error: "",
            data: [],
            pageSettings: {
              count: 0
            }
          }
        }
      }
    case TYPES.MONTH_EXPANSES_CLEANUP:
      {
        let copiedPages = { ...state.pages };
        delete copiedPages[action.buildingName];

        return {
          ...state,
          pages: copiedPages
        }
      }
    default: return state;
  }
}