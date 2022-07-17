import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { initStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingCircle from "./components/LoadingCircle";
import ViewManager from "./ViewManager/ViewManager";
import { getAllBuildings, getSettings } from "./services/mainProcess.svc";
import AppLoader from "./components/AnimatedLoaders/AppLoader";
import AppLoadingView from "./WindowViews/AppLoadingView/AppLoadingView";

// get url query param for the view manager
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const viewName = urlParams.get("view");

// because redux reducers depend on some data from the backend
// we must fetch it first before creating the store and especially
// the store reducers because they depend on that data for
// the intial state for some of the reducers
// better than using electron's remote module which causes memory leaks
// future projects will have a better structure that will avoid this
// design mistake
const APPInitializer = () => {
  const [buildingsDataReady, setBuildingsDataReady] = useState(false);
  const [settingsReady, setSettingsReady] = useState(false);
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    getAllBuildings((result) => {
      if (result.data) {
        localStorage.setItem("buildings", JSON.stringify(result.data));
        setBuildingsDataReady(false);
      }
    });

    getSettings((result) => {
      if (result.data) {
        localStorage.setItem("settings", JSON.stringify(result.data));
        setSettingsReady(true);
      }
    });

    localStorage.setItem(
      "pages",
      JSON.stringify([
        "monthExpanses",
        "budgetExecutions",
        "summarizedBudgets",
        "statistics"
      ])
    );
  }, []);

  useEffect(() => {
    if (settingsReady && buildingsDataReady) {
      const setupStore = async () => {
        const { persistor, store } = await initStore();

        setStore(store);
        setPersistor(persistor);
      };

      setupStore();
    }
  }, [settingsReady, buildingsDataReady]);

  // i had to extract the AppLoadingView from the ViewManger
  // and put it one level above because it will ignore this view
  // because of the if statement under that loades the AppLoader
  if (viewName === "AppLoadingView") return <AppLoadingView />;

  if (
    !buildingsDataReady ||
    !settingsReady ||
    store === null ||
    persistor === null
  )
    return <AppLoader text="טוען הגדרות אפליקציה" />;

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingCircle />} persistor={persistor}>
        <ViewManager viewName={viewName} />
      </PersistGate>
    </Provider>
  );
};

export default APPInitializer;
