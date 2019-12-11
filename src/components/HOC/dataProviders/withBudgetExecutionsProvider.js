import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as budgetExecutionsActions from '../../../redux/actions/budgetExecutionsActions';

const withBudgetExecutions = (WrappedComponent, buildingName, date) => {
  return class BudgetExecutionFetcher extends React.Component {

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
      const {
        data,
        isFetching,
        pageSettings,
        headerTitle,
        pageName
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

  };
}

const mapStateToProps = (state, ownProps) => ({
  page: state.budgetExecutions.pages[ownProps.buildingName],
  headerTitle: state.budgetExecutions.headerTitle,
  pageName: state.budgetExecutions.pageName
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetExecutions: (payload) => dispatch(budgetExecutionsActions.fetchBudgetExecutions(payload)),
  budgetExecutionsCleanup: (buildingNameEng) => dispatch(budgetExecutionsActions.budgetExecutionsCleanup(buildingNameEng)),
  initBudgetExecutionsState: (page) => dispatch(budgetExecutionsActions.initBudgetExecutionsState(page)),
  updateBudgetExecution: (param, oldBudgetExecutionObj, newBudgetExecutionObj, index) => dispatch(budgetExecutionsActions.updateBudgetExecution(param, oldBudgetExecutionObj, newBudgetExecutionObj, index)),
  addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionsActions.addBudgetExecution(payload, tableData))
});

withBudgetExecutions.propTypes = {
  buildingName: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withBudgetExecutions);