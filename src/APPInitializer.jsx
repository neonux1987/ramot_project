import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { initStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingCircle from "./components/LoadingCircle";
import ViewManager from "./ViewManager/ViewManager";
import { getAllBuildings, getSettings } from "./services/mainProcess.svc";

// because redux reducers depend on some data from the backend
// we must fetch it first before creating the store and especialli
// the store reducers because they depend on that data for
// the intial state for some of the reducers
// better than using electron's remote module which causes memory leaks
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
    if (settingsReady && buildingsDataReady) {
      const setupStore = async () => {
        const { persistor, store } = await initStore();

        setStore(store);
        setPersistor(persistor);
      };

      setupStore();
    }
  }, [settingsReady, buildingsDataReady]);

  return (
    <>
      {buildingsDataReady && settingsReady && store && persistor && (
        <Provider store={store}>
          <PersistGate loading={<LoadingCircle />} persistor={persistor}>
            <ViewManager />
          </PersistGate>
        </Provider>
      )}
    </>
  );
};

export default APPInitializer;
