const { buildings, pages } = require('electron').remote.getGlobal('sharedObject');

export const setPageState = (state, buildingName, target) => {
  return {
    ...state,
    pages: {
      ...state.pages,
      [buildingName]: {
        ...state.pages[buildingName],
        ...target
      }
    }
  }
}

export const setState = (state, pageName, buildingName, target) => {
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

export const setBuildingState = (buildingName, pageName, state, target) => {
  return {
    ...state,
    [buildingName]: {
      ...state[buildingName],
      pages: {
        ...state[buildingName].pages,
        [pageName]: {
          ...state[buildingName].pages[pageName],
          ...target
        }
      }
    }
  }
}

export const createPageReducer = (pageName, initialState) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case `${pageName}_RECEIVE`:
        return setPageState(state, action.buildingName, {
          isFetching: false,
          status: "success",
          data: action.data,
          pageSettings: action.data.info
        });
      case `${pageName}_REQUEST`:
        return setPageState(state, action.buildingName, {
          isFetching: true
        });
      case `${pageName}_UPDATE`:
        {
          const {
            payload,
            index,
            buildingName
          } = action;

          // copy the data
          const dataCopy = [...state.pages[buildingName].data];

          // replace the old object with the updated object
          dataCopy[index] = payload;

          return setPageState(state, action.buildingName, {
            data: dataCopy
          });
        }
      case `${pageName}_ADD`: {
        const {
          payload,
          buildingName,
          compareFunc
        } = action;

        // copy the data
        let dataCopy = [...state.pages[buildingName].data];

        //replace the old object with the updated object
        dataCopy.push(payload);

        if (compareFunc) {
          dataCopy = dataCopy.sort(compareFunc);
        }

        // copy page settings
        const pageSettingsCopy = { ...state.pages[buildingName].pageSettings };

        // add 1 to the count in page settings
        // the data grew in 1 in the database
        pageSettingsCopy.count += 1;

        return setPageState(state, action.buildingName, {
          data: dataCopy,
          pageSettings: pageSettingsCopy
        });
      };
      case `${pageName}_DELETE`: {
        const {
          buildingName,
          index
        } = action;

        // copy the data
        const dataCopy = [...state.pages[buildingName].data];

        //remove from the array
        dataCopy.splice(index, 1);

        // copy page settings
        const pageSettingsCopy = { ...state.pages[buildingName].pageSettings };

        // subtract 1 from the count in page settings
        // the data shrink in 1 in the database
        pageSettingsCopy.count -= 1;

        return setPageState(state, action.buildingName, {
          data: dataCopy,
          pageSettings: pageSettingsCopy
        });
      };
      case `${pageName}_FETCHING_FAILED`:
        return setPageState(state, action.buildingName, {
          status: "error",
          error: action.error
        });
      case `${pageName}_INIT_STATE`:
        return {
          ...state,
          pages: {
            ...state.pages,
            [action.buildingName]: {
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
      case `${pageName}_CLEANUP`:
        {
          let pagesCopy = { ...state.pages };
          delete pagesCopy[action.buildingName];

          return {
            ...state,
            pages: pagesCopy
          }
        }
      default: return state;
    }
  }
}

export const initBuildingState = (initState) => {
  const buildingsState = {};

  buildings.forEach((building) => {
    const singleBuildingState = buildingsState[building.engLabel] = {};
    const pagesState = singleBuildingState.pages = {};

    pages.forEach((page) => {

      pagesState[page] = {
        ...initState
      }
    });

  });

  return buildingsState;
}