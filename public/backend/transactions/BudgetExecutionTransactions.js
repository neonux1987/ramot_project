const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const Helper = require('../../helpers/Helper');

class BudgetExecutionTransactions {

  constructor(connection) {
    this.connection = connection;
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.generalSettingsLogic = new GeneralSettingsLogic();
  }

  /*  updateBudgetExecution({ date = Object, buildingName = String, budgetExec = Object, summarized_section_id = Number }) {
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
       console.log("month total budget failed");
       console.log(error.message);
       throw new Error(error.message)
     });
 
   } */

  updateBudgetExecution({ date = Object, buildingName = String, budgetExec = Object, summarized_section_id = Number }) {
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
            return this.budgetExecutionLogic.getAllBudgetExecutions(params, trx).then((result) => {
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
          });

      }).catch((error) => {
        console.log("failed");
        console.log(error);
        throw new Error(error.message)
      });
    })

  }

  /**
   * creates empty report for the new budget execution table
   * @param {*} buildingName 
   * @param {*} date 
   */
  createBudgetExecEmptyExpanses(buildingName, date) {

    return this.connection.transaction((trx) => {

      const quarter = date.quarter > 0 ? date.quarter - 1 : 4;//if quarter is 0 then set to quarter 4 of previous year
      const year = quarter === 4 ? date.year - 1 : date.year;//if the quarter is 4, go to previous year

      const newDate = {
        month: Helper.getCurrentMonthEng(monthNum),
        year: year
      }

      return this.monthExpansesLogic.getAllMonthExpansesTrx(buildingName, newDate, trx).then((expanses) => {
        if (expanses.length === 0) {
          return this.defaultExpansesCodesLogic.getDefaultExpansesCodesTrx(trx).then((defaultCodes) => {
            //prepare the data for insertion
            this.defaultExpansesCodesLogic.prepareDefaultBatchInsertion(defaultCodes, date);
            //insert the batch
            return this.budgetExecutionLogic.batchInsert(buildingName, defaultCodes, trx).then(() => {
              console.log(this.budgetExecutionLogic.getAllMonthExpansesTrx(buildingName, newDate, trx));
              return this.budgetExecutionLogic.getAllMonthExpansesTrx(buildingName, newDate, trx);
            });
          });//end default expanses codes logic
        } else {
          //prepare the data for insertion
          this.defaultExpansesCodesLogic.prepareBatchInsertion(expanses, date);
          //insert the batch
          return this.budgetExecutionLogic.batchInsert(buildingName, expanses, trx).then(() => {
            return this.budgetExecutionLogic.getAllMonthExpansesTrx(buildingName, newDate, trx);
          });
        }

      });//end month expanses logic

    });//end transaction

  }

}

module.exports = BudgetExecutionTransactions;