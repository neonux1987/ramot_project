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
import NotificationWrapper from './components/common/Notifications/NotificationWrapper';
import LoadingCircle from './components/common/LoadingCircle';
import generalSettingsActions from './redux/actions/generalSettingsActions';
import 'react-table/react-table.css';
import './assets/css/style.css';

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

  render() {
    this.toggleSidebarAnimation = !this.props.sidebar.toggleSidebar ? "hideAnimation" : "showAnimation";
    this.toggleSidebarButtonAnimation = !this.props.sidebar.toggleSidebar ? "hideButtonAnimation" : "showButtonAnimation";
    if (this.props.generalSettings.generalSettings.isFetching) {
      return <LoadingCircle loading={true} />;
    }
    return (
      <RTL>
        <MuiThemeProvider theme={theme}>
          <MemoryRouter>
            <div style={{ display: "flex", height: "100%", padding: 0 }}>
              <CssBaseline />
              <SidebarToggleButton toggleStyle={" " + this.toggleSidebarButtonAnimation} toggleSidebar={() => this.props.toggleSidebar(!this.props.sidebar.toggleSidebar)} />
              <Sidebar toggleStyle={" " + this.toggleSidebarAnimation} />
              <Main toggleMain={" showMainAnimation"} />
            </div>
            <NotificationWrapper notifications={this.props.app.notifications} />
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
  toggleSidebar: (payload) => dispatch(sidebarActions.toggleSidebar(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);