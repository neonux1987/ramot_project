const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const MonthTotalLogic = require('../logic/MonthTotalLogic');
const QuarterTotalLogic = require('../logic/QuarterTotalLogic');
const YearTotalLogic = require('../logic/YearTotalLogic');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const RegisteredMonthsLogic = require('../logic/RegisteredMonthsLogic');
const RegisteredQuartersLogic = require('../logic/RegisteredQuartersLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');

const SPECIAL_CODE_PREFIX = "9";

class MonthExpansesTransactions {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesLogic = new MonthExpansesLogic(connection);
    this.budgetExecutionLogic = new BudgetExecutionLogic(connection);
    this.summarizedBudgetLogic = new SummarizedBudgetLogic(connection);
    this.generalSettingsLogic = new GeneralSettingsLogic(connection);
    this.monthTotalLogic = new MonthTotalLogic(connection);
    this.quarterTotalLogic = new QuarterTotalLogic(connection);
    this.yearTotalLogic = new YearTotalLogic(connection);
    this.registeredMonthsLogic = new RegisteredMonthsLogic(connection);
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
    this.registeredYearsLogic = new RegisteredYearsLogic(connection);
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic(connection);
  }

  /**
  * update month expanse transaction
  * @param {*} id the id of the month expanse to update
  * @param {*} buildingName the name of the building
  * @param {*} expanseToSave the record to update with
  */
  /*   updateMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {
  
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
    } */

  /**
  * update month expanse transaction
  * @param {*} id the id of the month expanse to update
  * @param {*} buildingName the name of the building
  * @param {*} expanseToSave the record to update with
  */
  async updateMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    //get settings to get th tax value
    const settings = await this.generalSettingsLogic.getGeneralSettingsTrx(trx);

    const { tax } = settings[0];

    //update expanse object tax field to the latest current tax value
    expanse.tax = tax;

    //update month expanse
    await this.monthExpansesLogic.updateMonthExpanseTrx(date, buildingName, expanse, trx);

    //get the total sum of expanses that are related
    //of the same summarized section id
    const monthExpanses = await this.monthExpansesLogic.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, expanse.summarized_section_id, trx);

    //update execution
    await this.budgetExecutionLogic.updateExecutionTrx(monthExpanses, buildingName, date, expanse.summarized_section_id, tax, trx);

    //get budget execution after it was updated
    const budgetExecution = await this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, expanse.summarized_section_id, trx);

    //update summarized budget data
    await this.summarizedBudgetLogic.updateSummarizedBudgetTrx(budgetExecution, buildingName, date, trx);

    //convert the code to string in order to use the startsWith method
    //to find if it's a special code
    const code = expanse.code + "";

    //basically don't count the special codes in the total execution row
    if (!code.startsWith(SPECIAL_CODE_PREFIX)) {

      const allBudgetExecs = await this.budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingName, date, trx);

      //calculate total execution for quarter months
      const calculatedObj = BudgetExecutionLogic.calculateTotalExec(date.month, allBudgetExecs);

      //update month total execution (total expanses)
      await this.monthTotalLogic.updateMonthTotalTrx(buildingName, date, {
        total_expanses: calculatedObj.monthTotalExecution
      }, trx);

      //update quarter total execution (total expanses)
      await this.quarterTotalLogic.updateQuarterTotalTrx(buildingName, date, {
        total_expanses: calculatedObj.totalExecution
      }, trx);

      //get year total budget expanses
      const summarizedBudgets = await this.summarizedBudgetLogic.getBuildingSummarizedBudgetTrx(buildingName, date, trx);

      const summarizedCalculatedObj = SummarizedBudgetLogic.calculateTotalExec(date.year, summarizedBudgets);
      //update year total execution (total expanses)
      await this.yearTotalLogic.updateYearTotalTrx(buildingName, date, {
        total_expanses: summarizedCalculatedObj.total_expanses
      }, trx);

      console.log("asdad");

      trx.commit();

      return Promise.resolve();
    }

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
                    return this.monthTotalLogic.updateMonthTotalTrx(buildingName, date, totalSum, null, settings[0].tax, trx);
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
  async createEmptyReport(buildingName, date) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    const registeredMonth = await this.registeredMonthsLogic.getRegisteredMonthTrx(buildingName, date.month, date.year, trx);
    const registeredQuarter = await this.registeredQuartersLogic.getRegisteredQuarterTrx(buildingName, date.quarter, date.year, trx);
    const registeredYear = await this.registeredYearsLogic.getRegisteredYearTrx(buildingName, date.year, trx);

    if (registeredMonth.length === 0) {
      //create month expanses
      await this.monthExpansesLogic.createEmptyReport(buildingName, date, trx);
    }

    if (registeredQuarter.length === 0) {
      await this.budgetExecutionLogic.createEmptyReport(buildingName, date, trx);
    }

    if (registeredYear.length === 0) {
      await this.summarizedBudgetLogic.createEmptyReport(buildingName, date, trx);
    }

    const monthExpanses = await this.monthExpansesLogic.getAllMonthExpansesTrx(buildingName, date, trx);

    trx.commit();

    return monthExpanses;

  }

}

module.exports = MonthExpansesTransactions;