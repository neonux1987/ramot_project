import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import RTL from "./components/RTL";
import ModalRoot from "./components/modals/ModalRoot";
import AppBarContainer from "./layout/AppBar/AppBarContainer";
import SidebarContainer from "./layout/Sidebar/SidebarContainer";
import MainContainer from "./layout/Main/MainContainer";
import CustomToastContainer from "./toasts/CustomToastContainer/CustomToastContainer";
import ThemeContext from "./context/ThemeContext";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import ScrollToTop from "./containers/ScrollToTop/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import { test } from "./services/mainProcess.svc";

const App = ({ theme, settings, mainContainerRef }) => {
  return (
    <RTL>
      <MuiThemeProvider theme={theme}>
        <ThemeContext.Provider value={settings.data.theme}>
          <ScrollToTop mainContainer={mainContainerRef} />

          <AppWrapper>
            <CssBaseline />
            <AppBarContainer />
            <SidebarContainer />
            <MainContainer
              mainContainerRef={mainContainerRef}
              settings={settings}
            />
          </AppWrapper>

          <CustomToastContainer />
        </ThemeContext.Provider>
        <ModalRoot />
      </MuiThemeProvider>
    </RTL>
  );
};

export default App;
