import Helper from '../../helpers/Helper';
import { TYPES } from '../actions/monthExpansesActions';

const initState = {
  pageName: "monthExpanses",
  headerTitle: "מעקב הוצאות חודשיות",
  pages: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.RECEIVE_MONTH_EXPANSES:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.buildingName]: {
            ...state.pages[action.buildingName],
            date: action.date,
            isFetching: false,
            status: "success",
            data: action.data.data,
            pageSettings: action.data.info
          }
        }
      }
    case TYPES.REQUEST_MONTH_EXPANSES:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.buildingName]: {
            ...state.pages[action.buildingName],
            isFetching: true,
          }
        }
      }
    case TYPES.UPDATE_MONTH_EXPANSE:
      {

        const expanse = action.payload.expanse;//expanse object to update
        const index = action.payload.index;//index number of the expanse object in the array of data
        const copyPages = { ...state.pages };//copy data to not mess with the original

        //replace the old object with the updated object
        copyPages[action.buildingName].data[index] = expanse;

        return {
          ...state,
          pages: copyPages
        }
      }
    case TYPES.ADD_MONTH_EXPANSE:
      {
        const expanse = action.expanse;//expanse object to update
        const copyPages = { ...state.pages };//copy data to not mess with the original

        //replace the old object with the updated object
        copyPages[action.buildingName].data.push(expanse);

        // add 1 to the count in page settings
        // the data grew in 1 in the database
        copyPages[action.buildingName].pageSettings.count += 1;

        return {
          ...state,
          pages: copyPages
        }
      }
    case TYPES.DELETE_MONTH_EXPANSE:
      {
        const copyPages = { ...state.pages };//copy data to not mess with the original

        //remove from the array
        copyPages[action.buildingName].data.splice(action.index, 1);

        // subtract 1 from the count in page settings
        // the data shrink in 1 in the database
        copyPages[action.buildingName].pageSettings.count -= 1;

        return {
          ...state,
          pages: copyPages
        }
      }
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