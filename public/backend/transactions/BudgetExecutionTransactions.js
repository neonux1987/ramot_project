const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const RegisteredQuartersLogic = require('../logic/RegisteredQuartersLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const MonthTotalBudgetLogic = require('../logic/MonthTotalBudgetLogic');
const Helper = require('../../helpers/Helper');

class BudgetExecutionTransactions {

  constructor(connection) {
    this.connection = connection;
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.generalSettingsLogic = new GeneralSettingsLogic();
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
    this.registeredYearsLogic = new RegisteredYearsLogic(connection);
    this.monthTotalBudgetLogic = new MonthTotalBudgetLogic();
  }

  /* updateBudgetExecution({ date = Object, buildingName = String, budgetExec = Object, summarized_section_id = Number }) {
    return this.connection.transaction((trx) => {


      //get the tax field from general settings
      return this.generalSettingsLogic.getGeneralSettingsTrx(trx).then((settings) => {

        //update budget execution table
        return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, budgetExec, buildingName, date, summarized_section_id, settings[0].tax, trx)
          .then(() => {
            //get budget execution data after it was updated
            return this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx);
          })
          .then((budgetExec) => {
            //update summarized budet table
            return this.summarizedBudgetLogic.updateSummarizedBudgetTrx(budgetExec, buildingName, date, trx);
          })
          .then(() => {
            const params = {
              buildingName,
              date
            }
            return this.budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingName, date, trx).then((result) => {
              const monthNames = Helper.getQuarterMonths(date.quarter);

              const saveObject = {
                [`${monthNames[0]}_budget`]: 0,
                [`${monthNames[1]}_budget`]: 0,
                [`${monthNames[2]}_budget`]: 0
              }

              for (let i = 0; i < result.length; i++) {
                if (result[i].summarized_section_id !== 32 && result[i].summarized_section_id !== 33) {
                  //calculate budget
                  saveObject[`${monthNames[0]}_budget`] += result[i][`${monthNames[0]}_budget`];
                  saveObject[`${monthNames[1]}_budget`] += result[i][`${monthNames[1]}_budget`];
                  saveObject[`${monthNames[2]}_budget`] += result[i][`${monthNames[2]}_budget`];
                }
              }
              //calculate the total budget
              saveObject.total_budget = saveObject[`${monthNames[0]}_budget`] + saveObject[`${monthNames[1]}_budget`] + saveObject[`${monthNames[2]}_budget`];

              //update budget execution table
              return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, saveObject, buildingName, date, 33, settings[0].tax, trx).then(() => saveObject[`${date.monthEng}_budget`]);

            });
          })
          .then((totalBudget) => {
            console.log(totalBudget);
            return this.monthTotalBudgetLogic.updateMonthTotalBudgetTrx(buildingName, date, totalBudget, trx);
          });

      }).catch((error) => {
        console.log(error);
        throw new Error(error.message)
      });
    })

  } */

  async updateBudgetExecution({ date = Object, buildingName = String, budgetExec = Object, summarized_section_id = Number }) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    const tax = await this.montExpansesLogic.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, summarized_section_id, trx);

    await this.budgetExecutionLogic.updateBudgetExecutionTrx(null, budgetExec, buildingName, date, summarized_section_id, settings[0].tax, trx);

    await this.summarizedBudgetLogic.updateSummarizedBudgetTrx(budgetExec, buildingName, date, trx);

    //update budget execution table
    this.budgetExecutionLogic.updateBudgetExecutionTrx(null, budgetExec, buildingName, date, summarized_section_id, settings[0].tax, trx)
      .then(() => {
        //get budget execution data after it was updated
        return this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx);
      })
      .then((budgetExec) => {
        //update summarized budet table
        return this.summarizedBudgetLogic.updateSummarizedBudgetTrx(budgetExec, buildingName, date, trx);
      })
      .then(() => {
        const params = {
          buildingName,
          date
        }
        return this.budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingName, date, trx).then((result) => {
          const monthNames = Helper.getQuarterMonths(date.quarter);

          const saveObject = {
            [`${monthNames[0]}_budget`]: 0,
            [`${monthNames[1]}_budget`]: 0,
            [`${monthNames[2]}_budget`]: 0
          }

          for (let i = 0; i < result.length; i++) {
            if (result[i].summarized_section_id !== 32 && result[i].summarized_section_id !== 33) {
              //calculate budget
              saveObject[`${monthNames[0]}_budget`] += result[i][`${monthNames[0]}_budget`];
              saveObject[`${monthNames[1]}_budget`] += result[i][`${monthNames[1]}_budget`];
              saveObject[`${monthNames[2]}_budget`] += result[i][`${monthNames[2]}_budget`];
            }
          }
          //calculate the total budget
          saveObject.total_budget = saveObject[`${monthNames[0]}_budget`] + saveObject[`${monthNames[1]}_budget`] + saveObject[`${monthNames[2]}_budget`];

          //update budget execution table
          return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, saveObject, buildingName, date, 33, settings[0].tax, trx).then(() => saveObject[`${date.monthEng}_budget`]);

        });
      })
      .then((totalBudget) => {
        return this.monthTotalBudgetLogic.updateMonthTotalBudgetTrx(buildingName, date, totalBudget, trx);
      });

  }

  /**
   * creates empty report for the new budget execution table
   * @param {*} buildingName 
   * @param {*} date 
   */
  async createEmptyReport(buildingName, date) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    const registeredQuarter = await this.registeredQuartersLogic.getRegisteredQuarterTrx(buildingName, date.quarter, date.year, trx);
    const registeredYear = await this.registeredYearsLogic.getRegisteredYearTrx(buildingName, date.year, trx);

    //if we get a result it means the month
    //is already created
    if (registeredQuarter.length > 0) {
      trx.commit();
      return;
    }

    if (registeredQuarter.length === 0) {
      await this.budgetExecutionLogic.createEmptyReport(buildingName, date, trx);
    }

    if (registeredYear.length === 0) {
      await this.summarizedBudgetLogic.createEmptyReport(buildingName, date, trx);
    }

    const budgetExecs = await this.budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingName, date, trx);

    trx.commit();

    return budgetExecs;

  }

}

module.exports = BudgetExecutionTransactions;