import React, { Component } from 'react';
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Main from "./components/layout/main/Main";
import { MemoryRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RTL from './components/RTL';
import SidebarToggleButton from './components/layout/Sidebar/SidebarToggleButton';
import { connect } from 'react-redux';
import sidebarActions from './redux/actions/sidebarActions';
import LoadingCircle from './components/common/LoadingCircle';
import generalSettingsActions from './redux/actions/generalSettingsActions';
import Notification from './components/Notifications/Notification';
import notificationActions from './redux/actions/notificationsActions';
import 'react-table/react-table.css';
import './assets/css/style.css';
import AppFrame from './components/AppFrame/AppFrame';
const remote = require('electron').remote;

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(',')
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.toggleSidebarAnimation = "";
  }

  componentDidMount() {
    this.props.fetchGeneralSettings();
  }

  closeButtonHandler = () => {
    const window = remote.getCurrentWindow();
    window.close();
  }

  minimizeButtonHandler = () => {
    console.log("hello");
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
    this.toggleSidebarAnimation = !this.props.sidebar.toggleSidebar ? "hideAnimation" : "showAnimation";
    this.toggleSidebarButtonAnimation = !this.props.sidebar.toggleSidebar ? "hideButtonAnimation" : "showButtonAnimation";
    const { notification } = this.props.notifications;
    if (this.props.generalSettings.generalSettings.isFetching) {
      return <LoadingCircle loading={true} />;
    }
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
              <SidebarToggleButton toggleStyle={" " + this.toggleSidebarButtonAnimation} toggleSidebar={() => this.props.toggleSidebar(!this.props.sidebar.toggleSidebar)} />
              <Sidebar toggleStyle={" " + this.toggleSidebarAnimation} />
              <Main toggleMain={" showMainAnimation"} />
            </div>
            <Notification id={notification.id} isError={notification.isError} message={notification.message} remove={this.props.removeNotification} />
          </MemoryRouter>
        </MuiThemeProvider>
      </RTL>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchGeneralSettings: () => dispatch(generalSettingsActions.fetchGeneralSettings()),
  toggleSidebar: (payload) => dispatch(sidebarActions.toggleSidebar(payload)),
  removeNotification: (id) => dispatch(notificationActions.removeNotification(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);