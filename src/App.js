// LIBRARIES
import React, { useState, useRef, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';

// COMPONENTS
import Sidebar from "./Sidebar/Sidebar";
import RTL from './components/RTL';
import ToastRender from './components/ToastRender/ToastRender';
import AppFrame from './AppFrame/AppFrameContainer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// CONTEXT
import GlobalContext from './context/GlobalContext';

// UTILS
import { playSound, soundTypes } from './audioPlayer/audioPlayer';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

// CONTAINERS
import MainContainer from './Main/MainContainer';
import ModalRoot from './components/modals/ModalRoot';
import { myToasts } from './CustomToasts/myToasts';
import CustomCloseButton from './components/CustomCloseButton/CustomCloseButton';

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

const App = props => {

  const toggleSidebarAnimation = "";
  const mainContainer = useRef(null);

  const [state, setState] = useState({
    toastId: null
  })

  useEffect(() => {
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      console.log("update available");
    });
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      console.log("update downloaded");
    });
  }, [])

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
  }, []);

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

  const showUpdate = () => {
    myToasts.info("קיים עדכון תוכנה חדש.");
  }

  return (
    <RTL>
      <MuiThemeProvider theme={theme}>
        <MemoryRouter>
          <ScrollToTop mainContainer={mainContainer} />
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
          <ModalRoot />

        </MemoryRouter>
      </MuiThemeProvider>
    </RTL>
  );

}


const UpdateNotification = () => {
  return (<div style={{ background: "#fff" }}>
    update is available.
  </div>)
}

export default App;