import React from 'react';
import { connect } from 'react-redux';
import registeredQuartersActions from '../../redux/actions/registeredQuartersActions';
import registeredMonthsActions from '../../redux/actions/registeredMonthsActions';
import registeredYearsActions from '../../redux/actions/registeredYearsActions';

class RegisteredDatesFetcher extends React.Component {

  componentDidMount() {

    if (this.props.fetchMonths) {
      //fetch registered months
      this.props.fetchRegisteredMonths(this.props.params);
    }

    if (this.props.fetchQuarters) {
      //fetch registered quarters
      this.props.fetchRegisteredQuarters(this.props.params);
    }

    if (this.props.fetchYears) {
      //fetch registered years
      this.props.fetchRegisteredYears(this.props.params);
    }

  }

  componentWillUnmount() {
    //cleanup
    this.props.cleanupMonths();
    this.props.cleanupQuarters();
    this.props.cleanupYears();
  }

  render() {
    const { registeredMonths } = this.props.registeredMonths;
    const { registeredQuarters } = this.props.registeredQuarters;
    const { registeredYears } = this.props.registeredYears;

    return this.props.children({
      months: registeredMonths,
      quarters: registeredQuarters,
      years: registeredYears
    });
  }

}

const mapStateToProps = state => ({
  registeredMonths: state.registeredMonths,
  registeredQuarters: state.registeredQuarters,
  registeredYears: state.registeredYears
});

const mapDispatchToProps = dispatch => ({
  fetchRegisteredMonths: (buildingName) => dispatch(registeredMonthsActions.fetchRegisteredMonths(buildingName)),
  cleanupMonths: () => dispatch(registeredMonthsActions.cleanupMonths()),
  fetchRegisteredQuarters: (buildingName) => dispatch(registeredQuartersActions.fetchRegisteredQuarters(buildingName)),
  cleanupQuarters: () => dispatch(registeredQuartersActions.cleanupQuarters()),
  fetchRegisteredYears: (buildingName) => dispatch(registeredYearsActions.fetchRegisteredYears(buildingName)),
  cleanupYears: () => dispatch(registeredYearsActions.cleanupYears()),
});

RegisteredDatesFetcher.defaultProps = {
  fetchMonths: false,
  fetchQuarters: false,
  fetchYears: false
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredDatesFetcher);