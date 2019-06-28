import Helper from '../../helpers/Helper';

const initState = {
  date: Helper.getCurrentDate(),
  settings: {
    general: {
      tax: 17,
      dbPath: ""
    }
  },
  notifications: [

  ]
}

export default (state = initState, action) => {
  switch (action.type) {
    case "something":
      return {
        ...state,
        toggleSidebar: action.payload
      }
    default: return state;
  }
}