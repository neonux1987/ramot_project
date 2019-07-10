const NestHydrationJS = require('nesthydrationjs');
const MonthExpansesLogic = require('../../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../../logic/BudgetExecutionLogic');
const MonthExpansesDao = require('../MonthExpansesDao');
const BudgetExecutionDao = require('../BudgetExecutionDao');
const SummarizedBudget = require('../../dao/SummarizedBudgetDao');
const Helper = require('../../../helpers/Helper');

const BUDGET_EXEC_DEFINITION = [{
  id: { column: 'id', type: 'NUMBER' },
  summarized_section_id: { column: 'summarized_section_id', type: 'NUMBER' },
  section: 'section',
  year: { column: 'year', type: 'INTEGER' },
  quarter: { column: 'quarter', type: 'INTEGER' },
  april_budget_execution: { column: 'april_budget_execution', type: 'INTEGER' },
  april_budget: { column: 'april_budget', type: 'INTEGER' },
  may_budget_execution: { column: 'may_budget_execution', type: 'INTEGER' },
  may_budget: { column: 'may_budget', type: 'INTEGER' },
  june_budget_execution: { column: 'june_budget_execution', type: 'INTEGER' },
  june_budget: { column: 'june_budget', type: 'INTEGER' },
  evaluation: { column: 'evaluation', type: 'INTEGER' },
  total_budget: { column: 'total_budget', type: 'INTEGER' },
  total_execution: { column: 'total_execution', type: 'INTEGER' },
  difference: { column: 'difference', type: 'INTEGER' },
  notes: 'notes',
}];

const MONTH_EXPANSE_DEFINITION = [{
  id: { column: 'id', type: 'NUMBER' },
  expanses_code_id: { column: 'expanses_code_id', type: 'NUMBER' },
  code: { column: 'code', type: 'NUMBER' },
  codeName: 'codeName',
  summarized_section_id: { column: 'summarized_section_id', type: 'NUMBER' },
  section: 'section',
  supplierName: 'supplierName',
  sum: { column: 'sum', type: 'REAL' },
  notes: 'notes',
  month: 'month',
  year: { column: 'year', type: 'INTEGER' }
}];

class Transactions {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesDao = new MonthExpansesDao();
    this.budgetExecutionDao = new BudgetExecutionDao();
    this.summarizedBudget = new SummarizedBudget();
    this.nestHydrationJS = new NestHydrationJS();
  }

  /**
   * update month expanse record
   * @param {*} id the id of the month expanse to update
   * @param {*} buildingName the name of the building
   * @param {*} expanseToSave the record to update with
   */
  updateMonthExpanse({ date = Object, buildingName = String, expanse = Object, tax = Number }) {

    buildingName = Helper.trimSpaces(buildingName);

    return this.connection.transaction((trx) => {

      //prepare the expanse obejct, remove all the unneccessary 
      //fields so it can b saved.
      const expanseToUpdate = MonthExpansesLogic.prepareExpanseObj(expanse);
      //update the expanse
      return this.monthExpansesDao.updateMonthExpanseTrx(buildingName, expanse.id, expanseToUpdate, trx)
        .then(() => {
          //get all the expanses by summarized sections id
          return this.monthExpansesDao.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, expanse.summarized_section_id, trx);
        })
        .then((expanses) => {
          //calculate total sum of the received expanses
          const totalSum = MonthExpansesLogic.calculateExpansesSum(expanses);
          //get the quarter months query
          const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
          //get budget execution of the selected date
          return this.budgetExecutionDao.getBudgetExecution(buildingName, date, quarterQuery, expanse.summarized_section_id, trx)
            .then((budgets) => {
              //prepare budget execution object to be updated
              let budgetExec = BudgetExecutionLogic.calculateBudget(budgets[0], totalSum, date, tax);
              //update budget execution
              return this.budgetExecutionDao.updateBudgetExecution(buildingName, date, expanse.summarized_section_id, budgetExec, trx).then(() => budgets);
            }).catch(error => { throw error });
        })
        .then((budgets) => {
          //prepare the params
          const params = {
            summarized_section_id: budgets[0].summarized_section_id,
            buildingName,
            data: {
              [`${date.quarterEng}_budget`]: budgets[0].total_budget,//quarter budget
              [`${date.quarterEng}_execution`]: budgets[0].total_execution,//quarter execution
              year_total_budget: budgets[0].total_budget,//year budget
              year_total_execution: budgets[0].total_execution,//year execution
              notes: budgets[0].notes//notes
            },
            date: {
              year: date.year
            }
          }
          return this.summarizedBudget.updateSummarizedBudgetTrx(params, trx)
        })
        .then((result) => {
          //console.log(result);
        })
        .catch(error => { throw error });

    }).catch((error) => {
      throw new Error(error.message)
    });
  }

  addNewMonthExpanse(buildingName = String, record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון להוסיף הוצאה חדשה.");
      });;
  }

  generateTableData() {

    buildingName = Helper.trimSpaces(buildingName);

    return this.connection.transaction((trx) => {

    });

  }

}

module.exports = Transactions;