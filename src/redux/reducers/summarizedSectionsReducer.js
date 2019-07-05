import Helper from '../../helpers/Helper';

const initState = {
  pageName: "summarizedSections",
  headerTitle: "מעקב הוצאות חודשיות",
  date: Helper.getCurrentDate(),
  summarizedSections: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_SUMMARIZED_SECTIONS":
      return {
        ...state,
        summarizedSections: {
          ...state.summarizedSections,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_SUMMARIZED_SECTIONS":
      return {
        ...state,
        summarizedSections: {
          ...state.summarizedSections,
          isFetching: true,
        }
      }
    case "UPDATE_SUMMARIZED_SECTIONS":
      return {
        ...state,
        tableData: action.payload
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        summarizedSections: {
          ...state.summarizedSections,
          status: "error",
          error: action.payload
        }
      }
    default: return state;
  }
}