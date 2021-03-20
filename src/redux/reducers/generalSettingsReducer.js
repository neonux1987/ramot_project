
const initState = {
  pageName: "generalSettings",
  headerTitle: "כללי",
  isFetching: true,
  status: "",
  error: "",
  data: []
}

const generalSettingsReducer = (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_GENERAL_SETTINGS":
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case "REQUEST_GENERAL_SETTINGS":
      return {
        ...state,
        isFetching: true
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case "UPDATE_VAT": {
      const copyData = state.data;
      copyData[0].tax = action.vat

      return {
        ...state,
        data: copyData
      }
    }

    default: return state;
  }
}

export default generalSettingsReducer;