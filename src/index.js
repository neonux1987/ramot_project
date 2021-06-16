import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import LoadingCircle from './components/LoadingCircle';
import LoadingPage from './LoadingPage/LoadingPage';
import RestoreWizard from './RestoreWizard/RestoreWizard';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get('page');

const Component = whichComponent(page);

function storeWrapper(Component) {
  return () => <Provider store={store} >
    <PersistGate loading={<LoadingCircle />} persistor={persistor}>
      <Component />
    </PersistGate>
  </Provider>;
};

function whichComponent(page) {
  switch (page) {
    case "loading": return LoadingPage;
    case "restoreDB": return storeWrapper(RestoreWizard);
    default: return storeWrapper(App);
  }
}

//after the reducers injected, render the app
ReactDOM.render(<Component />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
