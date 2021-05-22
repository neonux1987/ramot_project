const { buildings, pages } = require('electron').remote.getGlobal('sharedObject');

export function getPages() {
  return pages;
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

export const setBuildingState = (buildingId, pageName, state, target) => {
  return {
    ...state,
    [buildingId]: {
      ...state[buildingId],
      pages: {
        ...state[buildingId].pages,
        [pageName]: {
          ...state[buildingId].pages[pageName],
          ...target
        }
      }
    }
  }
}

export const initBuildingState = (initState) => {
  const buildingsState = {};

  buildings.forEach((building) => {
    const singleBuildingState = buildingsState[building.id] = {};
    const pagesState = singleBuildingState.pages = {};

    pages.forEach((page) => {

      pagesState[page] = {
        ...initState
      }
    });

  });

  return buildingsState;
}

export const initState = (initState) => {
  const state = {};

  buildings.forEach((building) => {
    state[building.id] = {
      ...initState
    };
  });

  return state;
}