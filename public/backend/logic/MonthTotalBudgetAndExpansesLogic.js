const MonthTotalBudgetAndExpansesDao = require('../dao/MonthTotalBudgetAndExpansesDao');
const Helper = require('../../helpers/Helper');

class MonthTotalBudgetAndExpansesLogic {

  constructor(connection) {
    this.monthTotalBudgetAndExpansesDao = new MonthTotalBudgetAndExpansesDao(connection);
  }

  getMonthTotalBudgetAndExpanses(buildingName = String, date = Object) {
    return this.monthTotalBudgetAndExpansesDao.getMonthTotalBudgetAndExpanses(buildingName, date);
  }

  getMonthTotalBudgetAndExpansesTrx(buildingName = String, date = Object, trx) {
    return this.monthTotalBudgetAndExpansesDao.getMonthTotalBudgetAndExpansesTrx(buildingName, date, trx);
  }

  updateMonthTotalBudgetAndExpansesTrx(buildingName = String, date = Object, expanses = Number, totalBudget = Number, tax, trx) {

    return this.monthTotalBudgetAndExpansesDao.getMonthTotalBudgetAndExpansesTrx(buildingName, date, trx)
      .then((expansesArr) => {
        const expanses_without_tax = Helper.calculateWithoutTax(expanses, tax);
        const prev_without_tax = Helper.calculateWithoutTax(expansesArr[0].last_expanses_input_with_tax, tax);
        const monthTotalExpansesObj = {
          //subtract the previous expanses value from total and then add the new value
          total_expanses_with_tax: (expansesArr[0].total_expanses_with_tax - expansesArr[0].last_expanses_input_with_tax) + expanses,
          //subtract the previous expanses value without a tax from total and then add the new value without a tax
          total_expanses_without_tax: (expansesArr[0].total_expanses_without_tax - prev_without_tax) + expanses_without_tax,
          //save the new expanses value as last input for next update to play a role as previous value
          last_expanses_input_with_tax: expanses
        }
        return this.monthTotalBudgetAndExpansesDao.updateMonthTotalBudgetAndExpansesTrx(buildingName, date, monthTotalExpansesObj, trx);
      })
      .catch(error => { throw error });

  }

}

module.exports = MonthTotalBudgetAndExpansesLogic;