import React from 'react';
import { connect } from 'react-redux';
import budgetExecutionActions from '../../redux/actions/budgetExecutionActions';

class BudgetExecutionFetcher extends React.Component {

  componentDidMount() {

    // init the state first
    this.props.initState(this.props.params.buildingName).then(() => {
      // fetch budget executions
      this.props.fetchBudgetExecutions(this.props.params);
    });

  }

  componentWillUnmount() {
    //cleanup
    this.props.cleanup();
  }

  render() {
    const {
      pageName,
      headerTitle,
      pages,
      pageIndex
    } = this.props.budgetExecution;

    return this.props.children({
      pageName,
      headerTitle,
      budgetExecution: pages[pageIndex],
      actions: {
        fetch: this.props.fetchBudgetExecutions,
        update: this.props.updateBudgetExecution,
        add: this.props.addBudgetExecution,
      }
    });
  }

}

const mapStateToProps = state => ({
  budgetExecution: state.budgetExecution
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetExecutions: (payload) => dispatch(budgetExecutionActions.fetchBudgetExecutions(payload)),
  cleanup: (buildingNameEng) => dispatch(budgetExecutionActions.cleanup(buildingNameEng)),
  initState: (page) => dispatch(budgetExecutionActions.initState(page)),
  updateBudgetExecution: (param, oldBudgetExecutionObj, newBudgetExecutionObj, index) => dispatch(budgetExecutionActions.updateBudgetExecution(param, oldBudgetExecutionObj, newBudgetExecutionObj, index)),
  addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionActions.addBudgetExecution(payload, tableData))
});

BudgetExecutionFetcher.defaultProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetExecutionFetcher);