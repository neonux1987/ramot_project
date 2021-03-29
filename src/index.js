import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import LoadingCircle from './components/LoadingCircle';
import { ipcRenderer } from 'electron';
import LogoLoader from './components/AnimatedLoaders/LogoLoader/LogoLoader';
import createBudgetExecutionReducer from './redux/reducers/budgetExecutionsReducer';
import createMonthExpansesRedcuer from './redux/reducers/monthExpansesReducer';
import createSummarizedBudgetsRedcuer from './redux/reducers/summarizedBudgetsReducer';
import createRegisteredMonthsReducer from './redux/reducers/registeredMonthsReducer';
import createRegisteredQuartersReducer from './redux/reducers/registeredQuartersReducer';
import createRegisteredYearsReducer from './redux/reducers/registeredYearsReducer';
import createReportsReducer from './redux/reducers/reportsReducer';

const rootElement = document.getElementById('root');

ReactDOM.render(<LogoLoader />, rootElement);

//request buildings data
ipcRenderer.send("get-buildings");

// listeren for buildings data
ipcRenderer.once("buildings-data", (event, { data }) => {

  //since some reducers are depended on the buildings data
  // we can't inject theme manually but only dynamically after
  // receiving the buildings data
  store.injectReducer("monthExpanses", createMonthExpansesRedcuer(data));
  store.injectReducer("budgetExecutions", createBudgetExecutionReducer(data));
  store.injectReducer("summarizedBudgets", createSummarizedBudgetsRedcuer(data));
  store.injectReducer("registeredMonths", createRegisteredMonthsReducer(data));
  store.injectReducer("registeredQuarters", createRegisteredQuartersReducer(data));
  store.injectReducer("registeredYears", createRegisteredYearsReducer(data));
  store.injectReducer("reports", createReportsReducer(data));

  //after the reducers injected, render the app
  ReactDOM.render(
    <Provider store={store} >
      <PersistGate loading={<LoadingCircle />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>, rootElement);

});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
