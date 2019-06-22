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
import toggleSidebarAction from './redux/actions/sidebar/toggleSidebarAction';
import 'react-table/react-table.css';
import './assets/css/style.css';

const styles = theme => ({
  root: {
    display: "flex",
    height: "100%",
    padding: 0
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
              <SidebarToggleButton toggleStyle={" " + this.toggleSidebarButtonAnimation} toggleSidebar={() => this.props.toggleSidebarAction(!this.props.sidebar.toggleSidebar)} />
              <Sidebar toggleStyle={" " + this.toggleSidebarAnimation} />
              <Main toggleMain={" showMainAnimation"} />
            </div>
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
  toggleSidebarAction: (payload) => dispatch(toggleSidebarAction(payload))
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));