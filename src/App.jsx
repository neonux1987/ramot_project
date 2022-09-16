import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import RTL from "./components/RTL";
import ModalRoot from "./components/modals/ModalRoot";
import AppBarContainer from "./layout/AppBar/AppBarContainer";
import SidebarContainer from "./layout/Sidebar/SidebarContainer";
import MainContainer from "./layout/Main/MainContainer";
import CustomToastContainer from "./toasts/CustomToastContainer/CustomToastContainer";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import ScrollToTop from "./containers/ScrollToTop/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import ThemeContextWrapper from "./components/ThemeContextWrapper/ThemeContextWrapper";

const App = ({ theme, mainContainerRef }) => {
  return (
    <RTL>
      <MuiThemeProvider theme={theme}>
        <ThemeContextWrapper>
          <ScrollToTop mainContainer={mainContainerRef} />

          <AppWrapper>
            <CssBaseline />
            <AppBarContainer />
            <SidebarContainer />
            <MainContainer mainContainerRef={mainContainerRef} />
          </AppWrapper>

          <CustomToastContainer />
        </ThemeContextWrapper>
        <ModalRoot />
      </MuiThemeProvider>
    </RTL>
  );
};

export default App;
