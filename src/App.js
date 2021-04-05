// LIBRARIES
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import { withGoodBye } from 'react-goodbye';

// COMPONENTS
import RTL from './components/RTL';
import ModalRoot from './components/modals/ModalRoot';

// CSS
import 'react-toastify/dist/ReactToastify.css';

// CONTAINERS
import AppContainer from './AppContainer';

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Assistant',
      'sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#0066a2",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});

const App = () => {

  return (
    <RTL>
      <MuiThemeProvider theme={theme}>

        <EnhancedRouter>
          <AppContainer />
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