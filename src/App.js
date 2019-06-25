import React, { Component } from 'react';
import Sidebar from "./components/layout/sidebar/Sidebar";
import Main from "./components/layout/main/Main";
import { MemoryRouter } from 'react-router-dom';
import { CssBaseline, withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RTL from './components/RTL';
import SidebarToggleButton from './components/layout/sidebar/SidebarToggleButton';
import { connect } from 'react-redux';
import sidebarActions from './redux/actions/sidebarActions';
import NotificationBox from './components/common/notificationBox/NotificationBox';
import 'react-table/react-table.css';
import './assets/css/style.css';

const styles = theme => ({
  root: {
    display: "flex",
    height: "100%",
    padding: 0
  },
  errorBox: {
    width: "300px",
    padding: "30px",
    background: "#000000e0",
    borderRadius: "4px",
    //border: "1px solid #ccc",
    boxShadow: "0 0 4px #333333",
    minHeight: "100px",
    position: "absolute",
    zIndex: "99",
    bottom: "30px",
    left: "30px"
  }
});

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

  render() {
    this.toggleSidebarAnimation = !this.props.sidebar.toggleSidebar ? "hideAnimation" : "showAnimation";
    this.toggleSidebarButtonAnimation = !this.props.sidebar.toggleSidebar ? "hideButtonAnimation" : "showButtonAnimation";
    return (
      <RTL>
        <MuiThemeProvider theme={theme}>
          <MemoryRouter>
            <div className={this.props.classes.root}>
              <CssBaseline />
              <SidebarToggleButton toggleStyle={" " + this.toggleSidebarButtonAnimation} toggleSidebar={() => this.props.toggleSidebar(!this.props.sidebar.toggleSidebar)} />
              <Sidebar toggleStyle={" " + this.toggleSidebarAnimation} />
              <Main toggleMain={" showMainAnimation"} />
            </div>
            <NotificationBox isVisible />
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
  toggleSidebar: (payload) => dispatch(sidebarActions.toggleSidebar(payload))
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));