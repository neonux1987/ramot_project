import { createStore, applyMiddleware, combineReducers } from 'redux';
import staticReducers from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'app',
    //'sidebar',
    'monthExpanses',
    'budgetExecutions',
    "summarizedSections",
    "expansesCodes",
    "generalSettings",
    "summarizedBudgets",
    //"registeredMonths",
    //"registeredYears",
    //"registeredQuarters",
    "settings",
    "services",
    "registeredBackups",
    "monthlyStats",
    "quarterlyStats",
    "yearlyStats",
    "tableSettings",
    "modal",
    "registeredReports",
    //"routes",
    //"date",
    "savedNotification",
    "goodBye"
  ]

}

const persistedReducer = persistReducer(persistConfig, combineReducers(staticReducers));

const store = createStore(persistedReducer, applyMiddleware(thunk));

store.asyncReducers = {};

store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  store.persistor.persist();
}

// will later be used in the creation of dynamic reducers
store.addToBlacklist = async function addToBlacklist(buildingName) {
  persistConfig.blacklist.push(buildingName);
}

function createReducer(asyncReducers) {
  const combinedReducers = combineReducers({
    ...staticReducers,
    ...asyncReducers
  });

  const persistedReducer = persistReducer(persistConfig, combinedReducers);

  return persistedReducer;
}

const persistor = persistStore(store);
store.persistor = persistor;

export {
  store,
  persistor
};