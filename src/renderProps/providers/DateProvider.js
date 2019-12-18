import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as dateActions from '../../redux/actions/dateActions';

class DateProvider extends React.Component {

  componentDidMount() {
    const {
      pageName,
      buildingName,
      initState
    } = this.props;

    // init the state first
    this.props.initDateState(pageName, buildingName, initState);
  }

  componentWillUnmount() {
    const {
      pageName,
      buildingName
    } = this.props;

    //cleanup
    this.props.dateCleanup(pageName, buildingName);
  }

  render() {
    const {
      date,
      updateDate
    } = this.props;

    return this.props.children({
      date,
      actions: {
        updateDate
      }
    });
  }

};

const mapStateToProps = (state, ownProps) => ({
  date: state.date.pages[ownProps.pageName]
});

const mapDispatchToProps = dispatch => ({
  initDateState: (pageName, buildingName, initState) => dispatch(dateActions.initDateState(pageName, buildingName, initState)),
  dateCleanup: (pageName, buildingName) => dispatch(dateActions.dateCleanup(pageName, buildingName)),
  updateDate: (pageName, buildingName, date) => dispatch(dateActions.updateDate(pageName, buildingName, date))
});

DateProvider.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DateProvider);