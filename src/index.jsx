import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { initStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingCircle from "./components/LoadingCircle";
import ViewManager from "./ViewManager/ViewManager";
import { getAllBuildings, getSettings } from "./services/mainProcess.svc";

//after the reducers injected, render the app
ReactDOM.render(<Initializer />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const Initializer = () => {
  const [buildingsDataReady, setBuildingsDataReady] = useState(false);
  const [settingsReady, setSettingsReady] = useState(false);
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);
  console.log("hello");
  useEffect(() => {
    getAllBuildings((result) => {
      if (result.data) {
        localStorage.setItem("buildings", result.data);
        setBuildingsDataReady(true);
      }
    });

    getSettings((result) => {
      if (result.data) {
        localStorage.setItem("settings", result.data);
        setSettingsReady(true);
      }
    });

    localStorage.setItem("pages", [
      "monthExpanses",
      "budgetExecutions",
      "summarizedBudgets",
      "statistics"
    ]);
  }, []);

  useEffect(() => {
    if (settingsReady && buildingsDataReady) {
      /* const { persistor, store } = initStore();
      setStore(store);
      setPersistor(persistor); */
    }
  }, [settingsReady, buildingsDataReady]);

  return (
    <>
      {buildingsDataReady &&
        settingsReady &&
        store &&
        persistor(
          <Provider store={store}>
            <PersistGate loading={<LoadingCircle />} persistor={persistor}>
              <ViewManager />
            </PersistGate>
          </Provider>
        )}
    </>
  );
};
