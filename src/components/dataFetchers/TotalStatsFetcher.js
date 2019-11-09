import React from 'react';
import { connect } from 'react-redux';
import monthTotalActions from '../../redux/actions/monthTotalActions';
import quarterTotalActions from '../../redux/actions/quarterTotalActions';
//import yearTotalActions from '../../redux/actions/yearTotalActions';

class TotalStatsFetcher extends React.Component {

  componentDidMount() {

    if (this.props.fetchMonths) {
      //fetch quarter months stats
      this.props.fetchQuarterMonthsTotalStats(this.props.params);
    }

    if (this.props.fetchQuarters) {
      //fetch quarter total stats
      this.props.fetchQuarterTotalStats(this.props.params);
    }

    if (this.props.fetchYears) {
      //fetch year total
      //this.props.fetchYearTotalStats(this.props.params);
    }

  }

  componentWillUnmount() {
    //cleanup
    this.props.cleanupMonthTotal();
    this.props.cleanupQuarterTotal();
    //this.props.cleanupYearTotal();
  }

  render() {
    const { monthTotal } = this.props.monthTotal;
    const { quarterTotal } = this.props.quarterTotal;
    //const { yearTotal } = this.props.yearTotal;

    return this.props.children({
      monthStats: monthTotal,
      quarterStats: quarterTotal,
      //yearStats: yearTotal
    });
  }

}

const mapStateToProps = state => ({
  monthTotal: state.monthTotal,
  quarterTotal: state.quarterTotal,
  //yearTotal: state.yearTotal
});

const mapDispatchToProps = dispatch => ({
  fetchQuarterMonthsTotalStats: (params) => dispatch(monthTotalActions.fetchQuarterMonthsTotalStats(params)),
  cleanupMonthTotal: () => dispatch(monthTotalActions.cleanupMonthTotal()),
  fetchQuarterTotalStats: (params) => dispatch(quarterTotalActions.fetchQuarterTotalStats(params)),
  cleanupQuarterTotal: () => dispatch(quarterTotalActions.cleanupQuarterTotal()),
  //fetchYearTotalStats: (params) => dispatch(yearTotalActions.fetchYearTotalStats(params)),
  //cleanupYearTotal: () => dispatch(yearTotalActions.cleanupYearTotal())
});

TotalStatsFetcher.defaultProps = {
  fetchMonthStats: false,
  fetchQuarterStats: false,
  fetchYearStats: false
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalStatsFetcher);