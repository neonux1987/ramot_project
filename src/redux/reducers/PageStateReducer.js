import { TYPES } from '../actions/PagesStateActions';
import { setState } from './util/util';

const initState = {
  pages: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.PAGE_UPDATE: {
      const { pageName, buildingName, data } = action;
      return setState(state, pageName, buildingName, data);
    }
    case TYPES.PAGE_INIT_PAGE: {
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
    case TYPES.PAGE_INIT_BUILDING: {
      const {
        buildingName,
        pageName
      } = action;

      return {
        ...state,
        pages: {
          ...state.pages,
          [pageName]: {
            ...state.pages[pageName],
            [buildingName]: {
              registeredYearsCount: 0,
              registeredQuartersCount: 0,
              registeredMonthsCount: 0
            }
          }
        }
      };
    }
    default: return state;
  }
}
