import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as dateActions from '../../../redux/actions/dateActions';

class DateProvider extends React.Component {

  componentDidMount() {
    // init the state first
    this.props.initDateState(this.props.pageName, this.props.buildingName);
  }

  componentWillUnmount() {
    //cleanup
    this.props.dateCleanup(this.props.pageName, this.props.buildingName);
  }

  render() {
    return this.props.children(this.props.date);
  }

};

const mapStateToProps = (state, ownProps) => ({
  date: state.date.pages[ownProps.pageName]
});

const mapDispatchToProps = dispatch => ({
  initDateState: (pageName, buildingName) => dispatch(dateActions.initDateState(pageName, buildingName)),
  dateCleanup: (pageName, buildingName) => dispatch(dateActions.dateCleanup(pageName, buildingName))
});

DateProvider.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DateProvider);