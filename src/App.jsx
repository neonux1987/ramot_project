// LIBRARIES
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import { withGoodBye } from 'react-goodbye';
import { CssBaseline } from '@material-ui/core';
import RTL from './components/RTL';
import ModalRoot from './components/modals/ModalRoot';
import AppBarContainer from './layout/AppBar/AppBarContainer';
import SidebarContainer from './layout/Sidebar/SidebarContainer';
import MainContainer from './layout/Main/MainContainer';
import ToggleButton from './layout/ToggleButton/ToggleButton';
import CustomToastContainer from './toasts/CustomToastContainer/CustomToastContainer';
import ThemeContext from './context/ThemeContext';
import AppWrapper from './components/AppWrapper/AppWrapper';
import ScrollToTop from './containers/ScrollToTop/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

const App = ({
  theme,
  settings,
  sidebarToggleHandler,
  mainContainerRef
}) => {
  return (
    <RTL>
      <MuiThemeProvider theme={theme}>

        <EnhancedRouter>
          <ThemeContext.Provider value={settings.data.theme}>
            <ScrollToTop mainContainer={mainContainerRef} />

            <AppWrapper>
              <CssBaseline />
              <ToggleButton onClick={sidebarToggleHandler} />
              <AppBarContainer />
              <SidebarContainer />
              <MainContainer mainContainerRef={mainContainerRef} settings={settings} />
            </AppWrapper>

            <CustomToastContainer />
          </ThemeContext.Provider>
          <ModalRoot />
        </EnhancedRouter>

      </MuiThemeProvider>
    </RTL>


  );

}

// allows to prompt a dialog to the user on route
// change when the user didn't save data
const EnhancedRouter = withGoodBye(MemoryRouter);

export default App;