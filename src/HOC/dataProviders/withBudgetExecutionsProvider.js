import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as budgetExecutionsActions from '../../redux/actions/budgetExecutionsActions';

export default (WrappedComponent, buildingName, date) => {
  class withBudgetExecutionsProvider extends React.Component {

    componentDidMount() {
      console.log(date);
      const params = {
        date,
        buildingName
      }

      // init the state first
      this.props.initBudgetExecutionsState(buildingName).then(() => {
        // fetch budget executions
        this.props.fetchBudgetExecutions(params);
      });
    }

    componentWillUnmount() {
      //cleanup
      this.props.budgetExecutionsCleanup(buildingName);
    }

    render() {
      return <WrappedComponent
        location={this.location}
        headerTitle={this.headerTitle}
        date={this.date}
        pageName={this.pageName}
        budgetExecutions={{
          ...this.props.page,
          actions: {
            fetchBudgetExecutions: this.props.fetchBudgetExecutions,
            updateBudgetExecution: this.props.updateBudgetExecution,
            addBudgetExecution: this.props.addBudgetExecution
          }
        }}
      />
    }

  };// end of BudgetExecutions

  const mapStateToProps = (state) => ({
    page: state.budgetExecutions.pages[buildingName],
    headerTitle: state.budgetExecutions.headerTitle
  });

  const mapDispatchToProps = dispatch => ({
    fetchBudgetExecutions: (params) => dispatch(budgetExecutionsActions.fetchBudgetExecutions(params)),
    budgetExecutionsCleanup: (buildingNameEng) => dispatch(budgetExecutionsActions.budgetExecutionsCleanup(buildingNameEng)),
    initBudgetExecutionsState: (page) => dispatch(budgetExecutionsActions.initBudgetExecutionsState(page)),
    updateBudgetExecution: (param, oldBudgetExecutionObj, newBudgetExecutionObj, index) => dispatch(budgetExecutionsActions.updateBudgetExecution(param, oldBudgetExecutionObj, newBudgetExecutionObj, index)),
    addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionsActions.addBudgetExecution(payload, tableData))
  });

  return connect(mapStateToProps, mapDispatchToProps)(withBudgetExecutionsProvider);
}

