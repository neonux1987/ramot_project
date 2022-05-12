// LIBRARIES
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import { withGoodBye } from 'react-goodbye';
import { heIL } from '@material-ui/core/locale';

// COMPONENTS
import RTL from './components/RTL';
import ModalRoot from './components/modals/ModalRoot';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

// CONTAINERS
import AppContainer from './AppContainer';

const baseColors = {
  50: '#dbf7ff',
  100: '#aee3ff',
  200: '#7ecfff',
  300: '#4dbcff',
  400: '#22a8fe',
  500: '#0f8fe5',
  600: '#006fb3',
  700: '#004f81',
  800: '#003050',
  900: '#001120',
};

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
      main: "#0f8fe5",
      light: "#65bfff",
      dark: "#0062b2"
    },
    secondary: {
      main: "#001120",
      light: "#33404c",
      dark: "#000b16"
    }
  },
}, heIL);

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