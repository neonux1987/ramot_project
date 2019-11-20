import Helper from '../../helpers/Helper';

const initState = {
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
    case "SUMMARIZED_SECTIONS_CLEANUP":
      return {
        ...state,
        summarizedSections: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}