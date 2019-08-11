const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const MonthTotalBudgetAndExpansesLogic = require('../logic/MonthTotalBudgetAndExpansesLogic');
const Helper = require('../../helpers/Helper');

class MonthExpansesTransactions {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.generalSettingsLogic = new GeneralSettingsLogic();
    this.monthTotalBudgetAndExpansesLogic = new MonthTotalBudgetAndExpansesLogic();
  }

  /**
  * update month expanse transaction
  * @param {*} id the id of the month expanse to update
  * @param {*} buildingName the name of the building
  * @param {*} expanseToSave the record to update with
  */
  updateMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {

    return this.connection.transaction((trx) => {

      //get the tax field from general settings
      return this.generalSettingsLogic.getGeneralSettingsTrx(trx).then((settings) => {

        //update month expanses table
        return this.monthExpansesLogic.updateMonthExpanseTrx(date, buildingName, expanse, trx)
          .then((totalSum) => {
            //update budget execution table
            return this.budgetExecutionLogic.updateBudgetExecutionTrx(totalSum, null, buildingName, date, expanse.summarized_section_id, settings[0].tax, trx)
              .then(() => {
                return this.monthTotalBudgetAndExpansesLogic.updateMonthTotalBudgetAndExpansesTrx(buildingName, date, totalSum, null, settings[0].tax, trx);
              });
          })
          .then(() => {
            //get budget execution data after it was updated
            return this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, expanse.summarized_section_id, trx).then((data) => {
              //update summarized budet table
              return this.summarizedBudgetLogic.updateSummarizedBudgetTrx(data, buildingName, date, trx);
            });
          }).then(() => {
            const params = {
              buildingName,
              date
            }
            return this.budgetExecutionLogic.getAllBudgetExecutions(params, trx).then((result) => {
              const monthNames = Helper.getQuarterMonths(date.quarter);

              const saveObject = {
                [`${monthNames[0]}_budget_execution`]: 0,
                [`${monthNames[1]}_budget_execution`]: 0,
                [`${monthNames[2]}_budget_execution`]: 0
              }

              for (let i = 0; i < result.length; i++) {
                if (result[i].summarized_section_id !== 32 && result[i].summarized_section_id !== 33) {
                  //calculate budget
                  saveObject[`${monthNames[0]}_budget_execution`] += result[i][`${monthNames[0]}_budget_execution`];
                  saveObject[`${monthNames[1]}_budget_execution`] += result[i][`${monthNames[1]}_budget_execution`];
                  saveObject[`${monthNames[2]}_budget_execution`] += result[i][`${monthNames[2]}_budget_execution`];
                }
              }
              //calculate the total budget
              saveObject.total_execution = saveObject[`${monthNames[0]}_budget_execution`] + saveObject[`${monthNames[1]}_budget_execution`] + saveObject[`${monthNames[2]}_budget_execution`];

              //update budget execution table
              return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, saveObject, buildingName, date, 32, settings[0].tax, trx).then(() => saveObject[`${date.monthEng}_budget`]);

            });

          })

      }).catch((error) => {
        console.log(error);
        throw new Error(error.message)
      });


    });
  }

  addNewMonthExpanse(buildingName = String, record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון להוסיף הוצאה חדשה.");
      });
  }

}

module.exports = MonthExpansesTransactions;