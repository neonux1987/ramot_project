const MonthTotalExpansesDao = require('../dao/MonthTotalExpansesDao');
const Helper = require('../../helpers/Helper');

class MonthTotalExpansesLogic {

  constructor(connection) {
    this.monthTotalExpansesDao = new MonthTotalExpansesDao(connection);
  }

  getMonthTotalExpanses(buildingName = String, date = Object) {
    return this.monthTotalExpansesDao.getMonthTotalExpanses(buildingName, date);
  }

  getMonthTotalExpansesTrx(buildingName = String, date = Object, trx) {
    return this.monthTotalExpansesDao.getMonthTotalExpansesTrx(buildingName, date, trx);
  }

  updateMonthTotalExpansesTrx(buildingName = String, date = Object, newSum, prevSum, tax, trx) {

    return this.monthTotalExpansesDao.getMonthTotalExpansesTrx(buildingName, date, trx)
      .then((expanses) => {
        const prevSum_with_tax = Helper.calculateWithTax(prevSum, tax);
        const newSum_without_tax = Helper.calculateWithoutTax(newSum, tax);
        console.log("new untaxed " + newSum_without_tax);
        console.log("prev " + prevSum);
        console.log("prev taxed " + prevSum_with_tax);
        const monthTotalExpansesObj = {
          total_with_tax: (expanses[0].total_with_tax - prevSum_with_tax) + newSum,
          total_without_tax: (expanses[0].total_without_tax - prevSum) + newSum_without_tax
        }
        return this.monthTotalExpansesDao.updateMonthTotalExpansesTrx(buildingName, date, monthTotalExpansesObj, trx);
      })
      .catch(error => { throw error });

  }

  calculateMonthTotalSum(prevTotal, expanse) {

  };

}

module.exports = MonthTotalExpansesLogic;