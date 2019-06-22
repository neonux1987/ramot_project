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
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper
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
        <AppBar classes={{ root: this.props.classes.root }} position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="כללי" />
            <Tab label="קישורים" />
            <Tab label="גיבויים" />
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