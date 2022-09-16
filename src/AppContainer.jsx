// LIBRARIES
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heIL } from "@material-ui/core/locale";
import { createTheme } from "@material-ui/core/styles";
import AppLoader from "./components/AnimatedLoaders/AppLoader";
import useServices from "./customHooks/useServices";
import generalSettingsActions from "./redux/actions/generalSettingsActions";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

const theme = createTheme(
  {
    direction: "rtl", // Both here and <body dir="rtl">
    typography: {
      useNextVariants: true,
      fontFamily: ["Open Sans", "sans-serif"].join(",")
    },
    palette: {
      primary: {
        main: "rgb(23, 110, 193)"
      },
      secondary: {
        main: "#001120"
      }
    }
  },
  heIL
);

const AppContainer = () => {
  const mainContainerRef = useRef(null);
  const generalSettings = useSelector((store) => store.generalSettings);

  const dispatch = useDispatch();
  const [start, stop] = useServices();

  useEffect(() => {
    dispatch(generalSettingsActions.fetchGeneralSettings());
  }, [dispatch]);

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, [start, stop]);

  if (generalSettings.isFetching) {
    return <AppLoader text={"טוען הגדרות אפליקציה"} />;
  }

  return <App theme={theme} mainContainerRef={mainContainerRef} />;
};

export default React.memo(AppContainer);
