// LIBRARIES
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heIL } from "@material-ui/core/locale";
import { createMuiTheme } from "@material-ui/core/styles";
import AppLoader from "./components/AnimatedLoaders/AppLoader";
import useServices from "./customHooks/useServices";
import generalSettingsActions from "./redux/actions/generalSettingsActions";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import App from "./App";

const theme = createMuiTheme(
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
    // breakpoints: {
    //   values: {
    //     xs: 1280,
    //     sm: 1400,
    //     md: 1600,
    //     lg: 1900,
    //     xl: 1920
    //   }
    // }
  },
  heIL
);

const AppContainer = () => {
  const mainContainerRef = useRef(null);

  const settings = useSelector((store) => store.settings);
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

  return (
    <App
      theme={theme}
      mainContainerRef={mainContainerRef}
      settings={settings}
    />
  );
};

export default React.memo(AppContainer);
