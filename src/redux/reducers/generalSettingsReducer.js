
const initState = {
  pageName: "generalSettings",
  headerTitle: "כללי",
  generalSettings: {
    isFetching: true,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_GENERAL_SETTINGS":
      return {
        ...state,
        generalSettings: {
          ...state.generalSettings,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_GENERAL_SETTINGS":
      return {
        ...state,
        generalSettings: {
          ...state.generalSettings,
          isFetching: true,
        }
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        generalSettings: {
          ...state.generalSettings,
          status: "error",
          error: action.payload
        }
      }
    case "UPDATE_VAT": {
      const copyData = state.generalSettings.data;
      copyData[0].tax = action.vat

      return {
        ...state,
        generalSettings: {
          ...state.generalSettings,
          data: copyData
        }
      }
    }

    default: return state;
  }
}