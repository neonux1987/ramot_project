const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const MonthTotalBudgetAndExpansesLogic = require('../logic/MonthTotalBudgetAndExpansesLogic');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const RegisteredMonthsLogic = require('../logic/RegisteredMonthsLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
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
    this.registeredMonthsLogic = new RegisteredMonthsLogic(connection);
    this.registeredYearsLogic = new RegisteredYearsLogic(connection);
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic(connection);
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
              return this.budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingName, date, trx).then((result) => {
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
                return this.budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingName, date, trx).then((result) => {
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

      return this.monthExpansesLogic.createMonthEmptyExpanses(buildingName, date, trx)
        .then((expanses) => {
          return expanses;
        })

    })//end transaction
      .catch((error) => {
        console.log(error);
        throw new Error(error.message)
      });

  }

}

module.exports = MonthExpansesTransactions;