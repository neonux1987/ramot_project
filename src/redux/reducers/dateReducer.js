const initialState = {
  pages: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `DATE_UPDATE`: {
      const {
        buildingName,
        pageName,
        date
      } = action;
      return setDateState(state, pageName, buildingName, date);
    }
    case `DATE_INIT_PAGE`: {
      const {
        pageName
      } = action;

      return {
        ...state,
        pages: {
          ...state.pages,
          [pageName]: {
            ...state.pages[pageName]
          }
        }
      };
    }
    case `DATE_INIT_BUILDING`: {
      const {
        buildingName,
        pageName,
        initState
      } = action;

      return {
        ...state,
        pages: {
          ...state.pages,
          [pageName]: {
            ...state.pages[pageName],
            [buildingName]: {
              ...initState
            }
          }
        }
      };
    }
    case `DATE_CLEANUP`: {
      const {
        buildingName,
        pageName
      } = action;

      let pagesCopy = { ...state.pages };
      delete pagesCopy[pageName][buildingName];

      return {
        ...state,
        pages: pagesCopy
      }
    }
    default: return state;
  }

}

const setDateState = (state, pageName, buildingName, target) => {
  return {
    ...state,
    pages: {
      ...state.pages,
      [pageName]: {
        ...state.pages[pageName],
        [buildingName]: {
          ...state.pages[pageName][buildingName],
          ...target
        }
      }
    }
  }
}