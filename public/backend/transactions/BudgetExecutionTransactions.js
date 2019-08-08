const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');


class BudgetExecutionTransactions {

  constructor(connection) {
    this.connection = connection;
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();

  }

  updateBudgetExecution({ date = Object, buildingName = String, budgetExec = Object, summarized_section_id = Number }) {
    return this.connection.transaction((trx) => {
      //update budget execution table
      return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, budgetExec, buildingName, date, summarized_section_id, trx)
        .then(() => {
          //get budget execution data after it was updated
          return this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx).then((data) => {
            //update summarized budet table
            return this.summarizedBudgetLogic.updateSummarizedBudgetTrx(data, buildingName, date, trx);
          });
        })
        .catch(error => { throw error });

    }).catch((error) => {
      throw new Error(error.message)
    });

  }

}

module.exports = BudgetExecutionTransactions;