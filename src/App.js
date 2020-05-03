// LIBRARIES
import React, { useState, useRef, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { withGoodBye } from 'react-goodbye';

// COMPONENTS
import Sidebar from "./Sidebar/Sidebar";
import RTL from './components/RTL';
import ToastRender from './components/ToastRender/ToastRender';
import AppFrame from './AppFrame/AppFrameContainer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AppLoader from './components/AnimatedLoaders/AppLoader';

// CONTEXT
import SettingsContext from './context/SettingsContext';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

// CONTAINERS
import MainContainer from './Main/MainContainer';
import ModalRoot from './components/modals/ModalRoot';
import { myToasts } from './CustomToasts/myToasts';
import CustomCloseButton from './components/CustomCloseButton/CustomCloseButton';

// SOUND
import { playSound, soundTypes } from './audioPlayer/audioPlayer';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { fetchSettings } from './redux/actions/settingsActions';

// ELECTRON
const remote = require('electron').remote;
const { ipcRenderer } = require('electron');

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Rubik',
      'sans-serif'
    ].join(',')
  }
});

const TOAST_AUTO_CLOSE = 3000;
console.log("hello");
const App = props => {

  const toggleSidebarAnimation = "";
  const mainContainer = useRef(null);

  const [state, setState] = useState({
    toastId: null
  });

  const settings = useSelector(store => store.settings);

  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      myToasts.info("המערכת זיהתה גירסה יותר עדכנית 1.0.1");
    });
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      myToasts.info("המערכת הורידה את העדכון והוא מוכן להתקנה.");
    });

    dispatch(fetchSettings()).then(() => {
      //play welcome sound when settings loaded
      playSound(soundTypes.welcome);
    });

  }, [dispatch])

  useEffect(() => {
    //listen when the data comes back
    ipcRenderer.on("notify-renderer", (event, action, message) => {
      let toastId = null;
      switch (action) {
        case "dbBackupStarted":
          toastId = myToasts.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false
          });
          setState({ toastId });
          break;
        case "dbBackupFinished":
          myToasts.update(state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: myToasts.TYPE.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "dbBackupError":
          myToasts.update(state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: myToasts.TYPE.ERROR,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "reportsGenerationStarted":
          toastId = toast.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false
          });
          setState({ toastId: toastId });
          break;
        case "reportsGenerationFinished":
          toast.update(state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: toast.TYPE.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "errorTest":
          toast.error(message);
          break;
        default: return null;
      }
    });

    //start services
    ipcRenderer.send("system-start-services");
  });

  const closeButtonHandler = () => {
    const window = remote.getCurrentWindow();
    window.close();
  }

  const minimizeButtonHandler = () => {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  const maximizeButtonHandler = () => {
    const window = remote.getCurrentWindow();

    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  if (settings.isFetching) {
    return <AppLoader loading={settings.isFetching} />
  }

  return (
    <RTL>

      <MuiThemeProvider theme={theme}>

        <EnhancedRouter>

          <ScrollToTop mainContainer={mainContainer} />

          <SettingsContext.Provider value={settings.data}>

            <AppFrame handlers={{
              close: closeButtonHandler,
              minimize: minimizeButtonHandler,
              maximize: maximizeButtonHandler
            }} />

            <div style={{
              display: "flex",
              padding: "0",
              flex: "1",
              overflow: "hidden"
            }}>

              <CssBaseline />

              <Sidebar toggleStyle={" " + toggleSidebarAnimation} />

              <MainContainer mainContainer={mainContainer} toggleMain={" showMainAnimation"} />

            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={TOAST_AUTO_CLOSE}
              hideProgressBar={true}
              newestOnTop={false}
              rtl
              pauseOnVisibilityChange
              draggable={false}
              pauseOnHover
              transition={Flip}
              closeButton={<CustomCloseButton />}
            />
          </SettingsContext.Provider>

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