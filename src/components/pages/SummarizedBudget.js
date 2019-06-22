import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import LoadingCircle from '../common/LoadingCircle';
import Table from '../common/table/Table';
import SummarizedBudgetController from '../../controllers/SummarizedBudgetController';
import Helper from '../../helpers/Helper';
import Header from '../layout/main/Header';
import { connect } from 'react-redux';

const styles = (theme) => ({
  header: {
    display: "inline-block",
  }
});

const PAGE_NAME = "summarizedBudget";

class SummarizedBudget extends Component {

  constructor(props) {
    super(props);
    this.summarizedBudgetController = new SummarizedBudgetController();
    this.state = {
      data: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: this.props.location.state.engLabel,
      year: Helper.getCurrentYear(),
      month: Helper.getCurrentMonthEng()
    }
    //get the building month expanses
    this.summarizedBudgetController.getBuildingSummarizedBudget(params, (result) => {
      if (this._isMounted) {
        this.setState((state, props) => ({
          ...state,
          data: result
        }));
      }
    });

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.data.length === 0) {
      return (<LoadingCircle />);
    } else {
      return (
        <div>
          <Header
            title={"סיכום תקציבי"}
            subTitle={this.props.location.state.parentLabel + "/" + this.props.app.date.monthHeb + "/" + this.props.app.date.year}
            date={this.props.app.date}
            buildingName={this.props.location.state.parentLabel}
            pageName={PAGE_NAME}
            excelData={this.state.data}
            excelFileName={`${this.props.location.state.parentLabel} סיכום תקציבי`}
            enableDatePickerYear={true}
          >
          </Header>
          <Table padding="dense" headers={Helper.getSummarizedBudgetTableHeaders()} generalHeaders={undefined} rows={this.state.data} />
        </div>
      );
    }
  }

}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummarizedBudget));