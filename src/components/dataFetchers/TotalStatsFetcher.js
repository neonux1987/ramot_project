import React from 'react';
import { connect } from 'react-redux';
import monthlyStatsActions from '../../redux/actions/monthlyStatsActions';
import quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';
import yearlyStatsActions from '../../redux/actions/yearlyStatsActions';

class TotalStatsFetcher extends React.Component {

  componentDidMount() {

    if (this.props.allMonthStatsByQuarter) {
      //fetch quarter months stats
      this.props.fetchAllMonthsStatsByQuarter(this.props.params);
    }

    if (this.props.quarterStats) {
      //fetch quarter stats
      this.props.fetchQuarterStats(this.props.params);
    }

    if (this.props.allQuartersStatsByYear) {

      //fetch quarter stats
      this.props.fetchAllQuartersStatsByYear(this.props.params);
    }

    if (this.props.yearStats) {
      //fetch year stats
      this.props.fetchYearStats(this.props.params);
    }


  }

  componentWillUnmount() {
    //cleanup
    this.props.cleanupMonthlyStats();
    this.props.cleanupQuarterlyStats();
    this.props.cleanupYearlyStats();
  }

  render() {
    const { monthlyStats } = this.props.monthlyStats;
    const { quarterlyStats } = this.props.quarterlyStats;
    const { yearlyStats } = this.props.yearlyStats;

    return this.props.children({
      monthlyStats: monthlyStats,
      quarterlyStats: quarterlyStats,
      yearlyStats: yearlyStats
    });
  }

}

const mapStateToProps = (state, ownProps) => {
  return ({
    monthlyStats: state.monthlyStats,
    quarterlyStats: state.quarterlyStats,
    yearlyStats: state.yearlyStats,
    date: state[ownProps.pageName].pages[ownProps.params.buildingName].date
  });
}

const mapDispatchToProps = dispatch => ({
  fetchAllMonthsStatsByQuarter: (params) => dispatch(monthlyStatsActions.fetchAllMonthsStatsByQuarter(params)),
  cleanupMonthlyStats: () => dispatch(monthlyStatsActions.cleanupMonthlyStats()),
  fetchQuarterStats: (params) => dispatch(quarterlyStatsActions.fetchQuarterStats(params)),
  fetchAllQuartersStatsByYear: (params) => dispatch(quarterlyStatsActions.fetchAllQuartersStatsByYear(params)),
  cleanupQuarterlyStats: () => dispatch(quarterlyStatsActions.cleanupQuarterlyStats()),
  fetchYearStats: (params) => dispatch(yearlyStatsActions.fetchYearStats(params)),
  cleanupYearlyStats: () => dispatch(yearlyStatsActions.cleanupYearlyStats())
});

TotalStatsFetcher.defaultProps = {
  allMonthStatsByQuarter: false,
  quarterStats: false,
  allQuarterStatsByYear: false,
  yearStats: false
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalStatsFetcher);