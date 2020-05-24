// LIBRARIES
import React, { useState, useRef, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { withGoodBye } from 'react-goodbye';

// COMPONENTS
import Sidebar from "./Sidebar/Sidebar";
import RTL from './components/RTL';
import ToastRender from './components/ToastRender/ToastRender';
import AppFrame from './AppFrame/AppFrameContainer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { AlignCenterMiddle } from './components/AlignCenterMiddle/AlignCenterMiddle';

// CONTEXT
import SettingsContext from './context/SettingsContext';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

// CONTAINERS
import MainContainer from './Main/MainContainer';
import ModalRoot from './components/modals/ModalRoot';
import { myToaster } from './Toasts/toastManager';
import CustomCloseButton from './components/CustomCloseButton/CustomCloseButton';

// SOUND
import { playSound, soundTypes } from './audioPlayer/audioPlayer';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { fetchSettings, updateSettings, saveSettings } from './redux/actions/settingsActions';
import { quitApp } from './services/mainProcess.svc';

// SERVICES
import { initiateDbBackup } from './services/dbBackup.svc';
import { checkForUpdates } from './services/updates.svc';
import PacmanLoader from './components/AnimatedLoaders/PacmanLoader';

// ELECTRON
const { ipcRenderer, remote } = require('electron');
const appVersion = require("electron").remote.app.getVersion();

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

const App = () => {

  const toggleSidebarAnimation = "";
  const mainContainer = useRef(null);

  const [state, setState] = useState({
    toastId: null
  });

  const settings = useSelector(store => store.settings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings()).then(() => {
      //play welcome sound when settings loaded
      playSound(soundTypes.welcome);
    });
  }, [dispatch])

  useEffect(() => {

    dispatch(checkForUpdates()).then(({ data }) => {
      if (data !== null) {
        const { version } = data;

        if (appVersion !== version) {
          myToaster.AppUpdateNewVersion(version);
        }

      }
    });

  }, [dispatch]);

  useEffect(() => {

    const listenerCallback = (event, action, message) => {
      let toastId = null;
      switch (action) {
        case "dbBackupStarted":
          toastId = myToaster.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false
          });
          setState({ toastId });
          break;
        case "dbBackupFinished":
          myToaster.update(state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: myToaster.TYPE.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "dbBackupError":
          myToaster.update(state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: myToaster.TYPE.ERROR,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "reportsGenerationStarted":
          toastId = myToaster.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false
          });
          setState({ toastId: toastId });
          break;
        case "reportsGenerationFinished":
          myToaster.update(state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: myToaster.TYPE.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "systemError":
          myToaster.error(message);
          break;
        default: return null;
      }
    };

    // when he state updates it re-runs useEffect again
    // to avoid multiple register of of the same event
    // unregister all events
    ipcRenderer.removeAllListeners("notify-renderer");

    //listen when the data comes back
    ipcRenderer.on("notify-renderer", listenerCallback);

    //start services
    ipcRenderer.send("system-start-services");
  }, [state.toastId]);

  const closeButtonHandler = async () => {
    //const window = remote.getCurrentWindow();
    //window.close();

    if (settings.isFetching && settings.data.length === 0) {
      quitApp();
      return;
    }

    const id = myToaster.info(<ToastRender spinner={true} message={"מבצע גיבוי בסיס הנתונים לפני יציאה..."} />, {
      autoClose: false
    });


    const promise = await initiateDbBackup().catch((result) => {
      myToaster.update(id, {
        render: <ToastRender message={"המערכת לא הצליחה לבצע גיבוי לבסיס נתונים, מבצעת יציאה..."} />,
        type: myToaster.TYPE.ERROR,
        delay: 2000,
        autoClose: 2500,
        onClose: () => {
          quitApp();
        }
      });
    });

    // success
    if (promise)
      myToaster.update(id, {
        render: <ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה. המערכת מבצעת כעת יציאה..."} />,
        type: myToaster.TYPE.SUCCESS,
        delay: 2000,
        autoClose: 2500,
        onClose: () => {
          //quitApp();
        }
      });

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
    return <AlignCenterMiddle>
      <PacmanLoader size={40} margin={10} loaderColor={"#0365a2"} loading={settings.isFetching} title="" />
    </AlignCenterMiddle>;
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