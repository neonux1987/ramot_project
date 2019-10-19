const MonthTotalBudgetDao = require('../dao/MonthTotalBudgetDao');
const Helper = require('../../helpers/Helper');

class MonthTotalBudgetLogic {

  constructor(connection) {
    this.monthTotalBudgetDao = new MonthTotalBudgetDao(connection);
  }

  getMonthTotalBudgetTrx(buildingName = String, date = Object, trx) {
    return this.monthTotalBudgetDao.getMonthTotalBudgetTrx(buildingName, date, trx);
  }

  updateMonthTotalBudgetTrx(buildingName = String, date = Object, totalBudget = null, trx) {

    return this.monthTotalBudgetDao.getMonthTotalBudgetTrx(buildingName, date, trx)
      .then((monthBudget) => {
        //console.log(monthBudget);

      })
      .catch(error => { throw error });

  }

}

module.exports = MonthTotalBudgetLogic;