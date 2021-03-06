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
      buildingName: this.props.buildingName,
      pageName: this.props.pageName,
      date: this.props.date
    }

    //fetch quarter months stats
    this.props.fetchAllQuartersStatsByYear(params);

    //fetch quarter stats
    this.props.fetchYearStats(params);
  }

  componentWillUnmount() {
    const { buildingName, pageName } = this.props;
    //cleanup
    this.props.cleanupQuarterlyStats(buildingName, pageName);
    this.props.cleanupYearlyStats(buildingName, pageName);
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
        titleColor={colors[i]}
        loading={isFetching}
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
      titleColor={this.context.colorSet[4]}
      loading={isFetching}
    />;
  }

  render() {

    const {
      quarterlyStats,
      yearlyStats,
      buildingName,
      pageName
    } = this.props;

    const quarterlyStatsState = quarterlyStats[buildingName].pages[pageName];
    const yearlyStatsState = yearlyStats[buildingName].pages[pageName];

    if (quarterlyStatsState.data.length === 0 || yearlyStatsState.data.length === 0)
      return <AlignCenterMiddle style={{ height: "202px", fontSize: "18px" }}>אין נתונים</AlignCenterMiddle>;
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
  cleanupQuarterlyStats: (buildingName, pageName) => dispatch(quarterlyStatsActions.cleanupQuarterlyStats(buildingName, pageName)),
  fetchYearStats: (params) => dispatch(yearlyStatsActions.fetchYearStats(params)),
  cleanupYearlyStats: (buildingName, pageName) => dispatch(yearlyStatsActions.cleanupYearlyStats(buildingName, pageName))
});

TotalStatsFetcher.propTypes = {
  pageName: propTypes.string.isRequired,
  buildingName: propTypes.string.isRequired,
  date: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(YearStatsContainer);