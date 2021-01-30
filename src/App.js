// LIBRARIES
import React, { useRef, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { MemoryRouter } from 'react-router-dom';
import { withGoodBye } from 'react-goodbye';

// COMPONENTS
import Sidebar from "./Sidebar/Sidebar";
import RTL from './components/RTL';
import ToastRender from './components/ToastRender/ToastRender';
import AppFrame from './AppFrame/AppFrameContainer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { AlignCenterMiddle } from './components/AlignCenterMiddle/AlignCenterMiddle';
import LogoLoader from './components/AnimatedLoaders/LogoLoader/LogoLoader';
import ModalRoot from './components/modals/ModalRoot';

// CONTEXT
import ThemeContext from './context/ThemeContext';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

// CONTAINERS
import MainContainer from './Main/MainContainer';

import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { updateSettings, saveSettings } from './redux/actions/settingsActions';
import { quitApp } from './services/mainProcess.svc';
import { fetchSidebar } from './redux/actions/sidebarActions';

// SERVICES
import { initiateDbBackup } from './services/dbBackup.svc';
import { checkForUpdates } from './services/updates.svc';

// SOUND
import { soundManager } from './soundManager/SoundManager';

// TOASTS
import { toastManager } from './toasts/ToastManager';
import CustomToastContainer from './toasts/CustomToastContainer/CustomToastContainer';

// ELECTRON
const { ipcRenderer, remote } = require('electron');

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Heebo',
      'sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "rgb(3, 101, 162)",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});

const { play, types } = soundManager;

const TOAST_AUTO_CLOSE = 3000;
const TOAST_BACKUP_ID = "dbBackupSvc";
const TOAST_REPORTS_ID = "reportsGeneratorId";

const App = () => {

  const toggleSidebarAnimation = "";
  const mainContainer = useRef(null);

  const settings = useSelector(store => store.settings);

  const sidebar = useSelector(store => store.sidebar);

  const dispatch = useDispatch();

  /* useEffect(() => {
    const { appUpdates } = settings.data;
 
    dispatch(checkForUpdates()).then(async (result) => {
      if (result.data !== undefined && result.data !== null) {
        const { version } = result.data;
 
        if (appUpdates.userNotified === false && appUpdates.updateVersion !== version) {
 
          await dispatch(updateSettings("appUpdates", { userNotified: true }));
          await dispatch(saveSettings(false));
          toastManager.appUpdateNewVersion(version);
        }
 
      }
    });
  }, [dispatch, settings.data]); */

  useEffect(() => {
    dispatch(fetchSidebar());

    // play welcome melody on app start
    play(types.welcome);
  }, [dispatch]);

  useEffect(() => {

    const listenerCallback = (event, action, message) => {
      switch (action) {
        case "dbBackupStarted":
          toastManager.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false,
            toastId: TOAST_BACKUP_ID
          });
          break;
        case "dbBackupFinished":
          toastManager.update(TOAST_BACKUP_ID, {
            render: <ToastRender done={true} message={message} />,
            type: toastManager.types.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "dbBackupError":
          toastManager.update(TOAST_BACKUP_ID, {
            render: <ToastRender done={true} message={message} />,
            type: toastManager.types.ERROR,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "reportsGenerationStarted":
          toastManager.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false,
            toastId: TOAST_REPORTS_ID
          });
          break;
        case "reportsGenerationFinished":
          toastManager.update(TOAST_REPORTS_ID, {
            render: <ToastRender done={true} message={message} />,
            type: toastManager.types.SUCCESS,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE
          });
          break;
        case "systemError":
          toastManager.error(message);
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
  }, []);

  const closeButtonHandler = async () => {
    const { isFetching, data } = settings;
    const { backup_on_exit, enabled } = data.db_backup;

    // in case the backend stopped working
    // allow to close the app without backing up
    if ((isFetching && data.length === 0) || backup_on_exit === false || enabled === false) {
      quitApp();
      return Promise.resolve();
    }

    const id = toastManager.info(<ToastRender spinner={true} message={"מבצע גיבוי בסיס נתונים לפני יציאה..."} />, {
      autoClose: false
    });

    const promise = await initiateDbBackup().catch((result) => {
      toastManager.update(id, {
        render: <ToastRender message={result.error} />,
        type: toastManager.types.ERROR,
        delay: 3000,
        autoClose: 2500,
        onClose: () => {
          quitApp();
        }
      });
    });

    // success
    if (promise)
      toastManager.update(id, {
        render: <ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה. המערכת מבצעת כעת יציאה..."} />,
        type: toastManager.types.SUCCESS,
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



          <AppFrame handlers={{
            close: closeButtonHandler,
            minimize: minimizeButtonHandler,
            maximize: maximizeButtonHandler
          }} />

          <ThemeContext.Provider value={settings.data.theme}>

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