const MonthExpansesLogic = require('../MonthExpansesLogic');
const BudgetExecutionLogic = require('../BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../SummarizedBudgetLogic');


class Transactions {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();

  }

  /**
  * update month expanse transaction
  * @param {*} id the id of the month expanse to update
  * @param {*} buildingName the name of the building
  * @param {*} expanseToSave the record to update with
  */
  updateMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {

    return this.connection.transaction((trx) => {

      //update month expanses table
      return this.monthExpansesLogic.updateMonthExpanseTrx(date, buildingName, expanse, trx)
        .then((totalSum) => {
          //update budget execution table
          return this.budgetExecutionLogic.updateBudgetExecutionTrx(totalSum, null, buildingName, date, expanse.summarized_section_id, trx);
        })
        .then((budgets) => {
          return this.summarizedBudgetLogic.updateSummarizedBudgetTrx(budgets, buildingName, date, trx);
        })
        .catch(error => { throw error });

    }).catch((error) => {
      console.log(error);
      throw new Error(error.message)
    });
  }

  updateBudgetExecution({ date = Object, buildingName = String, budgetExec = Object, summarized_section_id = Number }) {
    return this.connection.transaction((trx) => {
      //update budget execution table
      return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, budgetExec, buildingName, date, summarized_section_id, trx)
        .then((budgets) => {
          return this.summarizedBudgetLogic.updateSummarizedBudgetTrx(budgets, buildingName, date, trx);
        })
        .catch(error => { throw error });

    }).catch((error) => {
      console.log(error);
      throw new Error(error.message)
    });

  }

  addNewMonthExpanse(buildingName = String, record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון להוסיף הוצאה חדשה.");
      });;
  }

}

module.exports = Transactions;