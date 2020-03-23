// LIBRARIES
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { MemoryRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast, Flip } from 'react-toastify';

// COMPONENTS
import Sidebar from "./Sidebar/Sidebar";
import RTL from './components/RTL';
import ToastRender from './components/ToastRender/ToastRender';
//import AlertDialogSlide from './components/common/AlertDialogSlide/AlertDialogSlide';
import AppFrame from './AppFrame/AppFrameContainer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// ACTIONS
import generalSettingsActions from './redux/actions/generalSettingsActions';

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
    this.mainContainer = React.createRef();
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
            type: toast.TYPE.SUCCESS,
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
        case "reportsGenerationStarted":
          toastId = toast.info(<ToastRender spinner={true} message={message} />, {
            autoClose: false,
            onOpen: () => playSound(soundTypes.message)
          });
          this.setState({ toastId: toastId });
          break;
        case "reportsGenerationFinished":
          toast.update(this.state.toastId, {
            render: <ToastRender done={true} message={message} />,
            type: toast.TYPE.SUCCESS,
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
            <ScrollToTop mainContainer={this.mainContainer} />
            <AppFrame handlers={{
              close: this.closeButtonHandler,
              minimize: this.minimizeButtonHandler,
              maximize: this.maximizeButtonHandler
            }} />
            <div style={{
              display: "flex",
              padding: "0",
              flex: "1",
              overflow: "hidden"
            }}>
              <CssBaseline />

              <Sidebar toggleStyle={" " + this.toggleSidebarAnimation} />

              <MainContainer mainContainer={this.mainContainer} toggleMain={" showMainAnimation"} />

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
            />
            <ModalRoot />

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