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
import LogoLoader from './components/AnimatedLoaders/LogoLoader/LogoLoader';
import CustomCloseButton from './components/CustomCloseButton/CustomCloseButton';
import ModalRoot from './components/modals/ModalRoot';

// CONTEXT
import SettingsContext from './context/SettingsContext';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

// CONTAINERS
import MainContainer from './Main/MainContainer';

// TOASTS
import { myToaster } from './Toasts/toastManager';

import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { updateSettings, saveSettings } from './redux/actions/settingsActions';
import { quitApp } from './services/mainProcess.svc';
import { fetchSidebar } from './redux/actions/sidebarActions';

// SERVICES
import { initiateDbBackup } from './services/dbBackup.svc';
import { checkForUpdates } from './services/updates.svc';

// SOUND
import soundManager from './soundManager/SoundManager';

// ELECTRON
const { ipcRenderer, remote } = require('electron');

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

const { play, types } = soundManager;

const TOAST_AUTO_CLOSE = 3000;

const App = () => {

  const toggleSidebarAnimation = "";
  const mainContainer = useRef(null);

  const [state, setState] = useState({
    toastId: null
  });

  const settings = useSelector(store => store.settings);

  const sidebar = useSelector(store => store.sidebar);

  const dispatch = useDispatch();

  useEffect(() => {
    const { appUpdates } = settings.data;

    dispatch(checkForUpdates()).then(async ({ data }) => {
      if (data !== null) {
        const { version } = data;

        if (appUpdates.userNotified === false && appUpdates.updateVersion !== version) {

          await dispatch(updateSettings("appUpdates", { userNotified: true }));
          await dispatch(saveSettings(false));
          myToaster.AppUpdateNewVersion(data.version);
        }

      }
    });
  }, [dispatch, settings.data]);

  useEffect(() => {
    dispatch(fetchSidebar());

    // play welcome melody on app start
    play(types.welcome);
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
    // in case the backend stopped working
    // allow to close the app without backing up
    if (settings.isFetching && settings.data.length === 0) {
      quitApp();
      return;
    }

    const id = myToaster.info(<ToastRender spinner={true} message={"מבצע גיבוי בסיס הנתונים לפני יציאה..."} />, {
      autoClose: false
    });

    const promise = await initiateDbBackup().catch((result) => {
      myToaster.update(id, {
        render: <ToastRender message={result.error} />,
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
        autoClose: 1500,
        onClose: () => {
          quitApp();
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

  if (sidebar.isFetching) {
    return <AlignCenterMiddle>
      <LogoLoader />
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
              style={{ width: "340px" }}
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