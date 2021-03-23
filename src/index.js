import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { initStore, persistor, store } from './redux/store';
//import staticReducers from './redux/reducers/index';
import { PersistGate } from 'redux-persist/integration/react'
import LoadingCircle from './components/LoadingCircle';
import { ipcRenderer } from 'electron';
import LogoLoader from './components/AnimatedLoaders/LogoLoader/LogoLoader';

ReactDOM.render(<LogoLoader />, document.getElementById('root'));


//request request to backend to get the data
ipcRenderer.send("get-buildings");
//listen when the data comes back
ipcRenderer.once("buildings-data", (event, result) => {

  ReactDOM.render(
    <Provider store={store} >
      <PersistGate loading={<LoadingCircle />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>, document.getElementById('root'));

});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
