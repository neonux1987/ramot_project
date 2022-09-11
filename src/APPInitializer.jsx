import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import LoadingCircle from "./components/LoadingCircle";
import { refreshView } from "./services/mainProcess.svc";
import AppLoader from "./components/AnimatedLoaders/AppLoader";
import RestoreWizard from "./WindowViews/RestoreWizardView/RestoreWizardView";
import AppContainer from "./AppContainer";
import { purgeCacheAfterRestore } from "./services/restoreDbService";

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
const APPInitializer = ({ viewName }) => {
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    const setupStore = async () => {
      const { initStore } = await import("./redux/store");
      const { persistor, store } = await initStore();

      setStore(store);
      setPersistor(persistor);

      // in case of database restore, purge the cache
      // and persist the new state
      if (store.getState().settings.data.redux.purgeCache) {
        await store.dispatch(purgeCacheAfterRestore(persistor));
        await refreshView();
      }
    };

    setupStore();
  }, []);

  if (store === null || persistor === null)
    return <AppLoader text="טוען הגדרות אפליקציה" />;

  if (viewName === "RestoreWizardView")
    return (
      <StoreWrapper store={store} persistor={persistor}>
        <RestoreWizard />
      </StoreWrapper>
    );

  return (
    <StoreWrapper store={store} persistor={persistor}>
      <MemoryRouter>
        <AppContainer />
      </MemoryRouter>
    </StoreWrapper>
  );
};

export default APPInitializer;
