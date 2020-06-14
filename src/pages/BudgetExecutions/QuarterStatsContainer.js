// LIBRARIES IMPORTS
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as monthlyStatsActions from '../../redux/actions/monthlyStatsActions';
import * as quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';

import Helper from '../../helpers/Helper';

import StatBox from '../../components/Stats/StatBox/StatBox';
import Stats from '../../components/Stats/Stats';

import TotalStatsFetcher from '../../renderProps/providers/TotalStatsFetcher';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';

class QuarterStatsContainer extends React.PureComponent {

  componentDidMount() {
    if (this.props.date.year !== undefined)
      this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.date.year !== prevProps.date.year ||
        this.props.date.quarter !== prevProps.date.quarter)
      && (this.props.date.year !== undefined)
    )
      this.fetchData();
  }

  fetchData = () => {
    const params = {
      buildingName: this.props.buildingName,
      pageName: this.props.pageName,
      date: this.props.date
    }

    //fetch quarter months stats
    this.props.fetchAllMonthsStatsByQuarter(params);

    //fetch quarter stats
    this.props.fetchQuarterStats(params);
  }

  componentWillUnmount() {
    const { buildingName, pageName } = this.props;

    //cleanup
    this.props.cleanupMonthlyStats(buildingName, pageName);
    this.props.cleanupQuarterlyStats(buildingName, pageName);
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
        outcome={monthStats[i].outcome}
        income={monthStats[i].income}
        unicodeSymbol={Helper.shekelUnicode}
        titleColor={Helper.quarterMonthsColors[i]}
        loading={isFetching}
      />;

    } // end loop

    return returnStats;

  }

  generateQuarterStats = (quarterStat, isFetching) => {
    return <StatBox
      key={3}
      title={`רבעון ${quarterStat.quarter}`}
      outcome={quarterStat.outcome}
      income={quarterStat.income}
      unicodeSymbol={Helper.shekelUnicode}
      titleColor={Helper.endQuarterColor}
      loading={isFetching}
    />;
  }

  render() {

    const {
      date,
      monthlyStats,
      quarterlyStats,
      buildingName,
      pageName
    } = this.props;

    const monthlyStatsState = monthlyStats[buildingName].pages[pageName];
    const quarterlyStatsState = quarterlyStats[buildingName].pages[pageName];

    if ((monthlyStatsState.data.length === 0) || quarterlyStatsState.data.length === 0)
      return <AlignCenterMiddle style={{ height: "202px", fontSize: "18px" }}>אין נתונים.</AlignCenterMiddle>;
    else {

      //generate quarter months stats
      const stats = this.generateMonthlyStats(monthlyStatsState.data, date.quarter, monthlyStatsState.isFetching);
      //generate quarter total stats
      stats.push(this.generateQuarterStats(quarterlyStatsState.data[0], quarterlyStatsState.isFetching))

      return (<Stats stats={stats} columns={4} />);

    }
  }

}

const mapStateToProps = (state) => {
  return ({
    monthlyStats: state.monthlyStats,
    quarterlyStats: state.quarterlyStats
  });
}

const mapDispatchToProps = dispatch => ({
  fetchAllMonthsStatsByQuarter: (params) => dispatch(monthlyStatsActions.fetchAllMonthsStatsByQuarter(params)),
  cleanupMonthlyStats: (buildingName, pageName) => dispatch(monthlyStatsActions.cleanupMonthlyStats(buildingName, pageName)),
  fetchQuarterStats: (params) => dispatch(quarterlyStatsActions.fetchQuarterStats(params)),
  cleanupQuarterlyStats: (buildingName, pageName) => dispatch(quarterlyStatsActions.cleanupQuarterlyStats(buildingName, pageName))
});

TotalStatsFetcher.propTypes = {
  pageName: propTypes.string.isRequired,
  buildingName: propTypes.string.isRequired,
  date: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(QuarterStatsContainer);