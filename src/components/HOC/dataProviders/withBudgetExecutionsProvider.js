import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as budgetExecutionsActions from '../../../redux/actions/budgetExecutionsActions';

export default (WrappedComponent, pageName, buildingName, date) => {
  class BudgetExecutions extends React.Component {

    componentDidMount() {
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
      console.log(this.props);
      const {
        data,
        isFetching,
        pageSettings,
        headerTitle
      } = this.props.page;

      return <WrappedComponent
        budgetExecutions={{
          date,
          data,
          isFetching,
          pageSettings,
          headerTitle,
          pageName,
          actions: {
            fetchBudgetExecutions: this.props.fetchBudgetExecutions,
            budgetExecutionsCleanup: this.props.budgetExecutionsCleanup,
            initBudgetExecutionsState: this.props.initBudgetExecutionsState,
            updateBudgetExecution: this.props.updateBudgetExecution,
            addBudgetExecution: this.props.addBudgetExecution
          }
        }}
      />
    }

  };// end of BudgetExecutions

  const mapStateToProps = (state, ownProps) => ({
    page: state.budgetExecutions.pages[buildingName],
    headerTitle: state.budgetExecutions.headerTitle
  });

  const mapDispatchToProps = dispatch => ({
    fetchBudgetExecutions: (payload) => dispatch(budgetExecutionsActions.fetchBudgetExecutions(payload)),
    budgetExecutionsCleanup: (buildingNameEng) => dispatch(budgetExecutionsActions.budgetExecutionsCleanup(buildingNameEng)),
    initBudgetExecutionsState: (page) => dispatch(budgetExecutionsActions.initBudgetExecutionsState(page)),
    updateBudgetExecution: (param, oldBudgetExecutionObj, newBudgetExecutionObj, index) => dispatch(budgetExecutionsActions.updateBudgetExecution(param, oldBudgetExecutionObj, newBudgetExecutionObj, index)),
    addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionsActions.addBudgetExecution(payload, tableData))
  });

  BudgetExecutions.propTypes = {
    buildingName: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(BudgetExecutions);
}

