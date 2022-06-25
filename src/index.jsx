import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingCircle from "./components/LoadingCircle";
import ViewManager from "./ViewManager/ViewManager";

//after the reducers injected, render the app
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingCircle />} persistor={persistor}>
      <ViewManager />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
