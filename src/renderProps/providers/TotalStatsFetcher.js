import React from 'react';
import { connect } from 'react-redux';
import * as monthlyStatsActions from '../../redux/actions/monthlyStatsActions';
import * as quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';
import * as yearlyStatsActions from '../../redux/actions/yearlyStatsActions';

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

const mapStateToProps = (state) => {
  return ({
    monthlyStats: state.monthlyStats,
    quarterlyStats: state.quarterlyStats,
    yearlyStats: state.yearlyStats
  });
}

const mapDispatchToProps = dispatch => ({
  fetchAllMonthsStatsByQuarter: (params) => dispatch(monthlyStatsActions.fetchAllMonthsStatsByQuarter(params)),
  fetchQuarterStats: (params) => dispatch(quarterlyStatsActions.fetchQuarterStats(params)),
  fetchAllQuartersStatsByYear: (params) => dispatch(quarterlyStatsActions.fetchAllQuartersStatsByYear(params)),
  fetchYearStats: (params) => dispatch(yearlyStatsActions.fetchYearStats(params))
});

TotalStatsFetcher.defaultProps = {
  allMonthStatsByQuarter: false,
  quarterStats: false,
  allQuarterStatsByYear: false,
  yearStats: false
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalStatsFetcher);