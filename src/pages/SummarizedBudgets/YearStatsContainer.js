// LIBRARIES IMPORTS
import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import * as quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';
import * as yearlyStatsActions from '../../redux/actions/yearlyStatsActions';

import Helper from '../../helpers/Helper';

import DonutStatBox from '../../components/Stats/DonutStatBox';
import Stats from '../../components/Stats/Stats';

import TotalStatsFetcher from '../../renderProps/providers/TotalStatsFetcher';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';

import ThemeContext from '../../context/ThemeContext';

class YearStatsContainer extends React.PureComponent {
  static contextType = ThemeContext;
  componentDidMount() {
    if (this.props.date.year !== undefined)
      this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.date.year !== prevProps.date.year &&
      this.props.date.year !== undefined
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
    this.props.fetchAllQuartersStatsByYear(params);

    //fetch quarter stats
    this.props.fetchYearStats(params);
  }

  componentWillUnmount() {
    const { buildingId, pageName } = this.props;
    //cleanup
    this.props.cleanupQuarterlyStats(buildingId, pageName);
    this.props.cleanupYearlyStats(buildingId, pageName);
  }

  generateQuarterlyStats(quarterlyStats, isFetching) {
    const colors = this.context.colorSet;

    // list of strings of qurter months
    const quarters = Helper.getYearQuarters();

    // where the boxes will be stored fo render
    const stats = [];

    for (let i = 0; i < quarters.length; i++) {
      const { outcome, income } = quarterlyStats[i];

      stats[i] = <DonutStatBox
        key={`quarter${i}`}
        title={quarters[i]}
        outcome={outcome}
        income={income}
        unicodeSymbol={Helper.shekelUnicode}
        color={colors[i]}
        loading={isFetching}
        index={i + 1}
      />;

    } // end loop

    return stats;

  }

  generateYearStats(yearStats, isFetching) {
    const { year, income, outcome } = yearStats;
    return <DonutStatBox
      key={"year"}
      title={`${year}`}
      outcome={outcome}
      income={income}
      unicodeSymbol={Helper.shekelUnicode}
      color={this.context.colorSet[4]}
      border
      loading={isFetching}
      index={5}
    />;
  }

  render() {

    const {
      quarterlyStats,
      yearlyStats,
      buildingId,
      pageName
    } = this.props;

    const quarterlyStatsState = quarterlyStats[buildingId].pages[pageName];
    const yearlyStatsState = yearlyStats[buildingId].pages[pageName];

    if (quarterlyStatsState.data.length === 0 || yearlyStatsState.data.length === 0)
      return <AlignCenterMiddle style={{ height: "202px", fontSize: "18px" }}>לא נטענו נתונים.</AlignCenterMiddle>;
    else {

      //generate quarter months stats
      const stats = this.generateQuarterlyStats(quarterlyStatsState.data, quarterlyStatsState.isFetching);
      //generate quarter total stats
      stats.push(this.generateYearStats(yearlyStatsState.data[0], yearlyStatsState.isFetching))

      return (<Stats stats={stats} columns={5} />);

    }
  }

}

const mapStateToProps = (state) => ({
  quarterlyStats: state.quarterlyStats,
  yearlyStats: state.yearlyStats
});

const mapDispatchToProps = dispatch => ({
  fetchAllQuartersStatsByYear: (params) => dispatch(quarterlyStatsActions.fetchAllQuartersStatsByYear(params)),
  cleanupQuarterlyStats: (buildingId, pageName) => dispatch(quarterlyStatsActions.cleanupQuarterlyStats(buildingId, pageName)),
  fetchYearStats: (params) => dispatch(yearlyStatsActions.fetchYearStats(params)),
  cleanupYearlyStats: (buildingId, pageName) => dispatch(yearlyStatsActions.cleanupYearlyStats(buildingId, pageName))
});

TotalStatsFetcher.propTypes = {
  pageName: propTypes.string.isRequired,
  buildingId: propTypes.string.isRequired,
  date: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(YearStatsContainer);