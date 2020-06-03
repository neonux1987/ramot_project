// LIBRARIES IMPORTS
import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import * as quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';
import * as yearlyStatsActions from '../../redux/actions/yearlyStatsActions';

import Helper from '../../helpers/Helper';

import StatBox from '../../components/Stats/StatBox/StatBox';
import Stats from '../../components/Stats/Stats';

import TotalStatsFetcher from '../../renderProps/providers/TotalStatsFetcher';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';

class YearStatsContainer extends React.PureComponent {

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
    // list of strings of qurter months
    const quarters = Helper.getYearQuarters();

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarters.length; i++) {

      returnStats[i] = <StatBox
        key={`quarter${i}`}
        title={quarters[i]}
        outcome={`${quarterlyStats[i].outcome} ${Helper.shekelUnicode}`}
        income={`${quarterlyStats[i].income} ${Helper.shekelUnicode}`}
        bgColor={Helper.quartersColors[i]}
        loading={isFetching}
      />;

    } // end loop

    return returnStats;

  }

  generateYearStats(yearStats, isFetching) {
    return <StatBox
      key={"year"}
      title={`שנת ${yearStats.year}`}
      outcome={`${yearStats.outcome} ${Helper.shekelUnicode}`}
      income={`${yearStats.income} ${Helper.shekelUnicode}`}
      bgColor={Helper.endYearColor}
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