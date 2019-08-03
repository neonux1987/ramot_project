import Helper from '../../helpers/Helper';

const initState = {
  date: Helper.getCurrentDate(),
  isLoading: true
}

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_LOADING_STATUS":
      return {
        ...state,
        isLoading: action.payload
      }
    default: return state;
  }
}