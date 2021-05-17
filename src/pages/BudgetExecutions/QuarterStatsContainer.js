// LIBRARIES IMPORTS
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as monthlyStatsActions from '../../redux/actions/monthlyStatsActions';
import * as quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';

import Helper from '../../helpers/Helper';

import Stats from '../../components/Stats/Stats';
import DonutStatBox from '../../components/Stats/DonutStatBox';

import TotalStatsFetcher from '../../renderProps/providers/TotalStatsFetcher';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';

import ThemeContext from '../../context/ThemeContext';

class QuarterStatsContainer extends React.PureComponent {
  static contextType = ThemeContext;

  componentDidMount() {
    if (this.props.date.year !== "")
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
      buildingId: this.props.buildingId,
      pageName: this.props.pageName,
      date: this.props.date
    }

    //fetch quarter months stats
    this.props.fetchAllMonthsStatsByQuarter(params);

    //fetch quarter stats
    this.props.fetchQuarterStats(params);
  }

  componentWillUnmount() {
    const { buildingId, pageName } = this.props;

    //cleanup
    this.props.cleanupMonthlyStats(buildingId, pageName);
    this.props.cleanupQuarterlyStats(buildingId, pageName);
  }

  generateMonthlyStats = (monthStats, quarter, isFetching) => {
    const colors = this.context.colorSet;
    // list of strings of qurter months
    const quarterMonths = Helper.getQuarterMonths(quarter);

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarterMonths.length; i++) {
      const { month, outcome, income } = monthStats[i];

      returnStats[i] = <DonutStatBox
        key={i}
        title={`${month}`}
        outcome={outcome}
        income={income}
        unicodeSymbol={Helper.shekelUnicode}
        color={colors[i]}
        loading={isFetching}
        index={i + 1}
      />;

    } // end loop

    return returnStats;

  }

  generateQuarterStats = (quarterStat, isFetching) => {
    const { quarter, outcome, income } = quarterStat;

    return <DonutStatBox
      key={3}
      title={`רבעון ${quarter}`}
      outcome={outcome}
      income={income}
      unicodeSymbol={Helper.shekelUnicode}
      color={this.context.colorSet[3]}
      loading={isFetching}
      index={4}
      border
    />;
  }

  render() {
    const {
      date,
      monthlyStats,
      quarterlyStats,
      buildingId,
      pageName
    } = this.props;

    const monthlyStatsState = monthlyStats[buildingId].pages[pageName];
    const quarterlyStatsState = quarterlyStats[buildingId].pages[pageName];

    if ((monthlyStatsState.data.length === 0) || quarterlyStatsState.data.length === 0)
      return <AlignCenterMiddle style={{ height: "256px", fontSize: "18px" }}>לא נטענו נתונים.</AlignCenterMiddle>;
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
  cleanupMonthlyStats: (buildingId, pageName) => dispatch(monthlyStatsActions.cleanupMonthlyStats(buildingId, pageName)),
  fetchQuarterStats: (params) => dispatch(quarterlyStatsActions.fetchQuarterStats(params)),
  cleanupQuarterlyStats: (buildingId, pageName) => dispatch(quarterlyStatsActions.cleanupQuarterlyStats(buildingId, pageName))
});

TotalStatsFetcher.propTypes = {
  pageName: propTypes.string.isRequired,
  buildingId: propTypes.string.isRequired,
  date: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(QuarterStatsContainer));