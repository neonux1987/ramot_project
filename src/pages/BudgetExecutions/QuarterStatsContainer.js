// LIBRARIES IMPORTS
import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import monthlyStatsActions from '../../redux/actions/monthlyStatsActions';
import quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';

import Helper from '../../helpers/Helper';

import StatBox from '../../components/Stats/StatBox/StatBox';
import Stats from '../../components/Stats/Stats';

import TotalStatsFetcher from '../../renderProps/providers/TotalStatsFetcher';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

class QuarterStatsContainer extends React.PureComponent {

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.date.year !== prevProps.date.year ||
      this.props.date.quarter !== prevProps.date.quarter
    )
      this.fetchData();
  }

  fetchData = () => {
    const params = {
      buildingName: this.props.buildingName,
      date: this.props.date
    }

    //fetch quarter months stats
    this.props.fetchAllMonthsStatsByQuarter(params);

    //fetch quarter stats
    this.props.fetchQuarterStats(params);
  }

  componentWillUnmount() {
    //cleanup
    this.props.cleanupMonthlyStats();
    this.props.cleanupQuarterlyStats();
  }

  generateMonthlyStats = (monthStats, quarter, isFetching) => {

    // list of strings of qurter months
    const quarterMonths = Helper.getQuarterMonths(quarter);

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarterMonths.length; i++) {

      returnStats[i] = <StatBox
        key={i}
        title={monthStats[i].month}
        outcome={`${monthStats[i].outcome} ${Helper.shekelUnicode}`}
        income={`${monthStats[i].income} ${Helper.shekelUnicode}`}
        bgColor={Helper.quarterMonthsColors[i]}
        loading={isFetching}
      />;

    } // end loop

    return returnStats;

  }

  generateQuarterStats = (quarterStat, isFetching) => {
    return <StatBox
      key={3}
      title={`רבעון ${quarterStat.quarter}`}
      outcome={`${quarterStat.outcome} ${Helper.shekelUnicode}`}
      income={`${quarterStat.income} ${Helper.shekelUnicode}`}
      bgColor={Helper.endQuarterColor}
      loading={isFetching}
    />;
  }

  render() {

    const {
      date,
      monthlyStats,
      quarterlyStats
    } = this.props;

    if (monthlyStats.data.length === 0 || quarterlyStats.data.length === 0)
      return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות סיכום רבעון..."} /></AlignCenterMiddle>;
    else {

      //generate quarter months stats
      const stats = this.generateMonthlyStats(monthlyStats.data, date.quarter, monthlyStats.isFetching);
      //generate quarter total stats
      stats.push(this.generateQuarterStats(quarterlyStats.data[0], quarterlyStats.isFetching))

      return (<Stats stats={stats} columns={4} />);

    }
  }

}

const mapStateToProps = (state) => {
  return ({
    monthlyStats: state.monthlyStats.monthlyStats,
    quarterlyStats: state.quarterlyStats.quarterlyStats
  });
}

const mapDispatchToProps = dispatch => ({
  fetchAllMonthsStatsByQuarter: (params) => dispatch(monthlyStatsActions.fetchAllMonthsStatsByQuarter(params)),
  cleanupMonthlyStats: () => dispatch(monthlyStatsActions.cleanupMonthlyStats()),
  fetchQuarterStats: (params) => dispatch(quarterlyStatsActions.fetchQuarterStats(params)),
  cleanupQuarterlyStats: () => dispatch(quarterlyStatsActions.cleanupQuarterlyStats())
});

TotalStatsFetcher.propTypes = {
  pageName: propTypes.string.isRequired,
  buildingName: propTypes.string.isRequired,
  date: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(QuarterStatsContainer);