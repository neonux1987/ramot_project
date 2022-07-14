import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "app",
    //'menu',
    //'monthExpanses',
    //'budgetExecutions',
    "summarizedSections",
    "expansesCodes",
    "generalSettings",
    //"summarizedBudgets",
    "registeredMonths",
    "registeredYears",
    "registeredQuarters",
    "settings",
    "registeredBackups",
    "monthlyStats",
    "quarterlyStats",
    "yearlyStats",
    "tableSettings",
    "modal",
    "registeredReports",
    //"routes",
    "date",
    "savedNotification",
    "routerPrompt",
    //"toggleSidebar",
    //statistics
    //"monthsChart",
    //"quartersChart",
    //"yearsChart",
    //"monthsChart",
    //"topChart",
    "reports",
    "print",
    "printTemplates"
  ]
};

let store = null;
let persistor = null;

// we dont want to import reducers outside of this fucntion
// because they are using data from the backend api to init
// some of the reducers state, if we import it outside this function
// in some of the reducers it will run function to initial the state
// based on data from the backend but we dont have it yet
const initStore = async () => {
  const staticReducers = await import("./reducers/index");

  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers(staticReducers.default)
  );

  store = createStore(persistedReducer, applyMiddleware(thunk));
  persistor = persistStore(store);
  store.persistor = persistor;

  return { store, persistor };
};

const getStore = () => {
  return store;
};

const getPersistor = () => {
  return persistor;
};

export { initStore, getStore, getPersistor };
