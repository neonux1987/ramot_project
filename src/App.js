import React, { Component } from 'react';
import Sidebar from "./Sidebar/Sidebar";
import { MemoryRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RTL from './components/RTL';
import { connect } from 'react-redux';
import generalSettingsActions from './redux/actions/generalSettingsActions';
import ToastRender from './components/ToastRender/ToastRender';
//import AlertDialogSlide from './components/common/AlertDialogSlide/AlertDialogSlide';
import AppFrame from './AppFrame/AppFrameContainer';
import { playSound, soundTypes } from './audioPlayer/audioPlayer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';
import MainContainer from './Main/MainContainer';

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

class App extends Component {

  constructor(props) {
    super(props);
    this.toggleSidebarAnimation = "";
  }

  state = {
    toastId: null
  }

  componentDidMount() {
    this.props.fetchGeneralSettings();
    //listen when the data comes back
    ipcRenderer.on("notify-renderer", (event, action, message) => {
      let toastId = null;
      switch (action) {
        case "dbBackupStarted":
          toastId = toast.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false,
            onOpen: () => playSound(soundTypes.message)
          });
          this.setState({ toastId: toastId });
          break;
        case "dbBackupFinished":
          toast.update(this.state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: toast.TYPE.INFO,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE,
            onOpen: () => {
              playSound(soundTypes.message)
            }
          });
          break;
        case "dbBackupError":
          toast.update(this.state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: toast.TYPE.ERROR,
            delay: 2000,
            autoClose: TOAST_AUTO_CLOSE,
            onOpen: () => {
              playSound(soundTypes.message)
            }
          });
          break;
        default: return null;
      }

    });
  }

  closeButtonHandler = () => {
    const window = remote.getCurrentWindow();
    window.close();
  }

  minimizeButtonHandler = () => {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  maximizeButtonHandler = () => {
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  render() {

    return (
      <RTL>
        <MuiThemeProvider theme={theme}>
          <MemoryRouter>
            <AppFrame handlers={{
              close: this.closeButtonHandler,
              minimize: this.minimizeButtonHandler,
              maximize: this.maximizeButtonHandler
            }} />
            <div style={{ display: "flex", height: "100%", padding: 0 }}>
              <CssBaseline />

              <Sidebar toggleStyle={" " + this.toggleSidebarAnimation} />

              <MainContainer toggleMain={" showMainAnimation"} />

            </div>
            <ToastContainer
              position="bottom-left"
              autoClose={TOAST_AUTO_CLOSE}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl
              pauseOnVisibilityChange
              draggable={false}
              pauseOnHover
            />
          </MemoryRouter>
        </MuiThemeProvider>
      </RTL>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchGeneralSettings: () => dispatch(generalSettingsActions.fetchGeneralSettings())
});

export default connect(null, mapDispatchToProps)(App);