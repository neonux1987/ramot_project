import Helper from '../../helpers/Helper';
import {
  REQUEST_MONTH_EXPANSES,
  RECEIVE_MONTH_EXPANSES,
  MONTH_EXPANSES_FETCHING_FAILED,
  UPDATE_MONTH_EXPANSE,
  ADD_MONTH_EXPANSE,
  DELETE_MONTH_EXPANSE,
  INIT_MONTH_EXPANSES_STATE,
  MONTH_EXPANSES_CLEANUP
} from '../actions/monthExpansesActions';

const initState = {
  pageName: "monthExpanses",
  headerTitle: "מעקב הוצאות חודשיות",
  pageIndex: -1,
  pages: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_MONTH_EXPANSES:
      {
        const copyPages = [...state.pages];
        copyPages[state.pageIndex] = {
          ...copyPages[state.pageIndex],
          isFetching: false,
          status: "success",
          data: action.data.expanses,
          pageSettings: action.data.pageSettings
        }
        return {
          ...state,
          pages: copyPages
        }
      }
    case REQUEST_MONTH_EXPANSES:
      {
        const copyPages = [...state.pages];
        const index = Helper.findIndexOfPage(action.page, copyPages);
        copyPages[index] = {
          ...copyPages[index],
          isFetching: true,
        };
        return {
          ...state,
          pages: copyPages
        }
      }
    case UPDATE_MONTH_EXPANSE:
      {

        const expanse = action.payload.expanse;//expanse object to update
        const index = action.payload.index;//index number of the expanse object in the array of data
        const copyPages = [...state.pages];//copy data to not mess with the original

        //replace the old object with the updated object
        copyPages[state.pageIndex].data[index] = expanse;

        return {
          ...state,
          pages: copyPages
        }
      }
    case MONTH_EXPANSES_FETCHING_FAILED:
      {
        const copyPages = [...state.pages];//copy data to not mess with the original
        copyPages[state.pageIndex] = {
          ...copyPages[state.pageIndex],
          status: "error",
          error: action.payload
        }
        return {
          ...state,
          pages: copyPages
        }
      }
    case INIT_MONTH_EXPANSES_STATE:
      {
        const initPages = [...state.pages];
        const page = {
          buildingNameEng: action.page,
          date: Helper.getCurrentDate(),
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
        initPages.push(page);
        const pageIndex = Helper.findIndexOfPage(action.page, initPages);
        return {
          ...state,
          pageIndex: pageIndex,
          pages: initPages
        }
      }
    case MONTH_EXPANSES_CLEANUP:
      {
        let copiedPages = [...state.pages];
        Helper.removePageFromArray(action.page, copiedPages);
        const pageIndex = Helper.findIndexOfPage(state.pages[state.pageIndex].buildingNameEng, copiedPages);
        return {
          ...state,
          pageIndex: pageIndex,
          pages: copiedPages
        }
      }
    default: return state;
  }
}