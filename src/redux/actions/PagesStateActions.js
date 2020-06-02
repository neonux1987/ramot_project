import { ipcSendReceive } from './util/util';

// TYPES
export const TYPES = {
  PAGE_UPDATE: "PAGE_UPDATE",
  PAGE_INIT_PAGE: "PAGE_INIT_PAGE",
  PAGE_INIT_BUILDING: "PAGE_INIT_BUILDING"
}

export const updatePage = (pageName, buildingName, data) => {
  return {
    type: TYPES.PAGE_UPDATE,
    pageName,
    buildingName,
    data
  }
}

const initPage = function (pageName) {
  return {
    type: TYPES.PAGE_INIT_PAGE,
    pageName
  }
};

const initBuilding = function (pageName, buildingName) {
  return {
    type: TYPES.PAGE_INIT_BUILDING,
    pageName,
    buildingName
  }
};

export const initPageState = (pageName, buildingName) => {
  return (dispatch, getState) => {
    const state = getState();
    const page = state.pageState.pages[pageName];

    if (page === undefined || page[buildingName] === undefined) {
      dispatch(initPage(pageName));
      dispatch(initBuilding(pageName, buildingName));
    }
  }
}