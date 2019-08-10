const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');

class MonthExpansesTransactions {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.generalSettingsLogic = new GeneralSettingsLogic();
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
            return this.budgetExecutionLogic.updateBudgetExecutionTrx(totalSum, null, buildingName, date, expanse.summarized_section_id, settings[0].tax, trx);
          })
          .then(() => {
            //get budget execution data after it was updated
            return this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, expanse.summarized_section_id, trx).then((data) => {
              //update summarized budet table
              return this.summarizedBudgetLogic.updateSummarizedBudgetTrx(data, buildingName, date, trx);
            });
          })
          .catch(error => { throw error });

      })

    }).catch((error) => {
      console.log(error);
      throw new Error(error.message)
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