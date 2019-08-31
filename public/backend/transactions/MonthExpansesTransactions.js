const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const MonthTotalBudgetAndExpansesLogic = require('../logic/MonthTotalBudgetAndExpansesLogic');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const Helper = require('../../helpers/Helper');

const SPECIAL_CODE_PREFIX = "9";

class MonthExpansesTransactions {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesLogic = new MonthExpansesLogic(connection);
    this.budgetExecutionLogic = new BudgetExecutionLogic(connection);
    this.summarizedBudgetLogic = new SummarizedBudgetLogic(connection);
    this.generalSettingsLogic = new GeneralSettingsLogic(connection);
    this.monthTotalBudgetAndExpansesLogic = new MonthTotalBudgetAndExpansesLogic(connection);
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic(connection);
  }

  getAllMonthExpanses({ buildingName, date }) {
    return this.monthExpansesLogic.getAllMonthExpansesTrx(buildingName, date, undefined)
      .then((expanses) => {
        //that means the data does not exist and need to be created
        if (expanses.length === 0) {
          console.log("yes");
          return this.createMonthEmptyExpanses(buildingName, date);
        } else {
          //else return the expanses
          return expanses;
        }
      })//end of get all month expanses trx
      .catch((error) => {
        console.log(error);
        throw new Error(error.message)
      });
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
        //update tax field to the last tax
        expanse.tax = settings[0].tax;
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
            //convert the code to string in order to use the startsWith method
            //to find if it's a special code
            const code = expanse.code + "";
            //basically don't count the special codes in the total execution row
            if (!code.startsWith(SPECIAL_CODE_PREFIX)) {
              return this.budgetExecutionLogic.getAllBudgetExecutions(params, trx).then((result) => {
                //calculate total execution for quarter months
                const saveObject = BudgetExecutionLogic.calculateTotalExec(date.quarter, result);
                //update budget execution table
                return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, saveObject, buildingName, date, 32, settings[0].tax, trx).then(() => saveObject[`${date.monthEng}_budget`]);

              });
            }

          })

      }).catch((error) => {
        console.log(error);
        throw new Error(error.message)
      });


    });
  }

  addNewMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {
    return this.connection.transaction((trx) => {

      //get the tax field from general settings
      return this.generalSettingsLogic.getGeneralSettingsTrx(trx).then((settings) => {
        //update tax field to the last tax
        expanse.tax = settings[0].tax;
        //update month expanses table
        return this.monthExpansesLogic.addNewMonthExpanseTrx(date, buildingName, expanse, trx)
          .then((expanseNewId) => {

            //get all the expanses by summarized sections id
            return this.monthExpansesLogic.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, expanse.summarized_section_id, trx)
              .then((expanses) => {
                //calculate total sum of the received expanses
                const totalSum = MonthExpansesLogic.calculateExpansesSum(expanses);
                return totalSum;
              })
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
              })
              .then(() => {
                const params = {
                  buildingName,
                  date
                }
                return this.budgetExecutionLogic.getAllBudgetExecutions(params, trx).then((result) => {
                  //calculate total execution for quarter months
                  const saveObject = BudgetExecutionLogic.calculateTotalExec(date.quarter, result);
                  //update budget execution table
                  return this.budgetExecutionLogic.updateBudgetExecutionTrx(null, saveObject, buildingName, date, 32, settings[0].tax, trx).then(() => saveObject[`${date.monthEng}_budget`]);

                });//end of get all budget executions

              })
              .then(() => {
                return expanseNewId;
              });//end of get month expanse by summarized section id trx

          });//end of add new month expanse trx

      })//end of get general settings
        .catch((error) => {
          console.log(error);
          throw new Error(error.message)
        });


    });//end transaction
  }

  deleteExpanse({ id = Number, buildingName = String }) {
    return this.connection.transaction((trx) => {



    });//end transaction
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  createMonthEmptyExpanses(buildingName, date) {

    return this.connection.transaction((trx) => {

      const monthNum = date.monthNum > 0 ? date.monthNum - 1 : 11;//if the month is 0 january, then go to month 11 december of previous year
      const year = monthNum === 11 ? date.year - 1 : date.year;//if the month is 11 december, go to previous year

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
            return this.monthExpansesLogic.batchInsert(buildingName, defaultCodes, trx).then(() => {
              console.log(this.monthExpansesLogic.getAllMonthExpansesTrx(buildingName, newDate, trx));
              return this.monthExpansesLogic.getAllMonthExpansesTrx(buildingName, newDate, trx);
            });
          });//end default expanses codes logic
        } else {
          //prepare the data for insertion
          this.defaultExpansesCodesLogic.prepareBatchInsertion(expanses, date);
          //insert the batch
          return this.monthExpansesLogic.batchInsert(buildingName, expanses, trx).then(() => {
            return this.monthExpansesLogic.getAllMonthExpansesTrx(buildingName, newDate, trx);
          });
        }

      });//end month expanses logic

    });//end transaction

  }

}

module.exports = MonthExpansesTransactions;