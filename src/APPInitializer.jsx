import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { initStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingCircle from "./components/LoadingCircle";
import { getAllBuildings, getSettings } from "./services/mainProcess.svc";
import AppLoader from "./components/AnimatedLoaders/AppLoader";
import AppLoadingView from "./WindowViews/AppLoadingView/AppLoadingView";
import ChartExportView from "./WindowViews/ChartExportView/ChartExportView";
import RestoreWizard from "./WindowViews/RestoreWizardView/RestoreWizardView";
import AppContainer from "./AppContainer";
import { purgeCacheAfterRestore } from "./services/restoreDbService";

// get url query param for the views
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const viewName = urlParams.get("view");

const StoreWrapper = ({ children, store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={<LoadingCircle />} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

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
        setBuildingsDataReady(true);
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
    if (
      (settingsReady && buildingsDataReady) ||
      viewName === "RestoreWizardView"
    ) {
      const setupStore = async () => {
        const { persistor, store } = await initStore();

        setStore(store);
        setPersistor(persistor);

        // in case of database restore, purge the cache
        // and persist the new state
        if (store.getState().settings.data.redux.purgeCache) {
          await store.dispatch(purgeCacheAfterRestore(persistor));
        }
        console.log(store.getState());
      };

      setupStore();
    }
  }, [settingsReady, buildingsDataReady]);

  // i had to extract the AppLoadingView from the ViewManger
  // and put it one level above because it will ignore this view
  // because of the if statement under that loades the AppLoader
  if (viewName === "AppLoadingView") return <AppLoadingView />;

  // to avoid the overhead of using the redux store
  if (viewName === "ChartExportView") return <ChartExportView />;

  if (viewName === "RestoreWizardView")
    return (
      store &&
      persistor && (
        <StoreWrapper store={store} persistor={persistor}>
          <RestoreWizard />
        </StoreWrapper>
      )
    );

  if (
    !buildingsDataReady ||
    !settingsReady ||
    store === null ||
    persistor === null
  )
    return <AppLoader text="טוען הגדרות אפליקציה" />;

  return (
    <StoreWrapper store={store} persistor={persistor}>
      <MemoryRouter>
        <AppContainer />
      </MemoryRouter>
    </StoreWrapper>
  );
};

export default APPInitializer;
