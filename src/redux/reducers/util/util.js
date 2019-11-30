import Helper from '../../../helpers/Helper';

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

export const createPageReducer = (pageName, initialState) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case `RECEIVE_${pageName}`:
        return setPageState(state, action.buildingName, {
          date: action.date,
          isFetching: false,
          status: "success",
          data: action.data.data,
          pageSettings: action.data.info
        });
      case `REQUEST_${pageName}`:
        return setPageState(state, action.buildingName, {
          isFetching: true
        });
      case `UPDATE_${pageName}`:
        {
          const {
            payload,
            index,
            buildingName
          } = action;

          // copy the data
          const dataCopy = { ...state.pages[buildingName].data };

          // replace the old object with the updated object
          dataCopy[index] = payload;

          return setPageState(state, action.buildingName, {
            data: dataCopy
          });
        }
      case `ADD_${pageName}`: {
        const {
          payload,
          buildingName
        } = action;

        // copy the data
        const dataCopy = { ...state.pages[buildingName].data };

        //replace the old object with the updated object
        dataCopy.push(payload);

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
      case `DELETE_${pageName}`: {
        const {
          buildingName,
          index
        } = action;

        // copy the data
        const dataCopy = { ...state.pages[buildingName].data };

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
      case `INIT_${pageName}_STATE`:
        return {
          ...state,
          pages: {
            ...state.pages,
            [action.buildingName]: {
              date: Helper.getCurrentDate(),
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