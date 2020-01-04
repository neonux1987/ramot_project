// LIBRARIES IMPORTS
import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import quarterlyStatsActions from '../../redux/actions/quarterlyStatsActions';
import yearlyStatsActions from '../../redux/actions/yearlyStatsActions';

import Helper from '../../helpers/Helper';

import StatBox from '../../components/Stats/StatBox/StatBox';
import Stats from '../../components/Stats/Stats';

import TotalStatsFetcher from '../../renderProps/providers/TotalStatsFetcher';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

class YearStatsContainer extends React.PureComponent {

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.date.year !== prevProps.date.year
    )
      this.fetchData();
  }

  fetchData = () => {
    const params = {
      buildingName: this.props.buildingName,
      date: this.props.date
    }

    //fetch quarter months stats
    this.props.fetchAllQuartersStatsByYear(params);

    //fetch quarter stats
    this.props.fetchYearStats(params);
  }

  componentWillUnmount() {
    //cleanup
    this.props.cleanupQuarterlyStats();
    this.props.cleanupYearlyStats();
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
      yearlyStats
    } = this.props;

    if (quarterlyStats.data.length === 0 || yearlyStats.data.length === 0)
      return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות סיכום שנתי..."} /></AlignCenterMiddle>;
    else {

      //generate quarter months stats
      const stats = this.generateQuarterlyStats(quarterlyStats.data, quarterlyStats.isFetching);
      //generate quarter total stats
      stats.push(this.generateYearStats(yearlyStats.data[0], yearlyStats.isFetching))

      return (<Stats stats={stats} columns={5} />);

    }
  }

}

const mapStateToProps = (state) => ({
  quarterlyStats: state.quarterlyStats.quarterlyStats,
  yearlyStats: state.yearlyStats.yearlyStats
});

const mapDispatchToProps = dispatch => ({
  fetchAllQuartersStatsByYear: (params) => dispatch(quarterlyStatsActions.fetchAllQuartersStatsByYear(params)),
  cleanupQuarterlyStats: () => dispatch(quarterlyStatsActions.cleanupQuarterlyStats()),
  fetchYearStats: (params) => dispatch(yearlyStatsActions.fetchYearStats(params)),
  cleanupYearlyStats: () => dispatch(yearlyStatsActions.cleanupYearlyStats())
});

TotalStatsFetcher.propTypes = {
  pageName: propTypes.string.isRequired,
  buildingName: propTypes.string.isRequired,
  date: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(YearStatsContainer);