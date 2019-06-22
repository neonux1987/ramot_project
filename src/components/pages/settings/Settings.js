import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
  tabs: {
    flexGrow: 1,
    backgroundColor: "#27354a"
    //backgroundColor: theme.palette.background.paper
  },
  tab: {
    fontSize: "16px"
  },
  indicator: {
    backgroundColor: "#fff"
  },
  selected: {
    backgroundColor: "#0a8fc1"
  }
});

const PAGE_NAME = "settings";

class Settings extends Component {

  state = {
    value: 0
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;


  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue })
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs classes={{ root: this.props.classes.tabs, indicator: this.props.classes.indicator }} value={this.state.value} onChange={this.handleChange}>
            <Tab classes={{ root: this.props.classes.tab, selected: this.props.classes.selected }} label="כללי" />
            <Tab classes={{ root: this.props.classes.tab, selected: this.props.classes.selected }} label="קישורים" />
            <Tab classes={{ root: this.props.classes.tab, selected: this.props.classes.selected }} label="גיבויים" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TabContainer>Item One</TabContainer>}
        {this.state.value === 1 && <TabContainer>Item Two</TabContainer>}
        {this.state.value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Settings));