import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'app',
    'sidebar',
    'monthExpanses',
    'budgetExecution',
    "summarizedSections",
    "expansesCodes",
    "generalSettings",
    "summarizedBudget",
    "registeredMonths",
    "registeredYears",
    "registeredQuarters",
    "settings",
    "backupsNames",
    "monthTotal",
    "quarterTotal"
  ]

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//export const store = createStore(rootReducer);


export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

//a way to save the state to a file
/* store.subscribe(() => {
  console.log(store.getState());
}) */