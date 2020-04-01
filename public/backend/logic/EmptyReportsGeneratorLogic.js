const MonthExpansesLogic = require('./MonthExpansesLogic');
const RegisteredReportsLogic = require('./RegisteredReportsLogic');
const MenuDao = require('../dao/MenuDao');
const connectionPool = require('../connection/ConnectionPool');

class EmptyReportsGeneratorLogic {

  constructor() {
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.registeredReportsLogic = new RegisteredReportsLogic();
    this.menuDao = new MenuDao();
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  async generateEmptyReports(date) {

    // Using trx as a transaction object:
    const trx = await connectionPool.getTransaction();

    const reports = await this.registeredReportsLogic.getRegisteredReports(trx);

    // using for loop instead of forEach method
    // because of problems with await/async
    for (let i = 0; i < reports.length; i++) {
      // if reports for the specific date already exist
      // don't allow them to be created twice.
      if (reports[i].year === date.year && reports[i].month === date.monthNum) {
        await trx.commit();
        throw new Error("הפעולה נכשלה. הדוחות לתאריכים שנבחרו כבר קיימים בבסיס נתונים.");
      }
    }

    const buildings = await this.menuDao.getMenu(trx);

    // create reports for each bulding
    for (let i = 0; i < buildings.length; i++) {
      await this.monthExpansesLogic.createEmptyReport(buildings[i].engLabel, date, trx);
    }

    // register the date of the new reports
    await this.registeredReportsLogic.addNewReport({
      year: date.year,
      month: date.monthNum
    }, trx);

    await trx.commit();
  }

}

module.exports = EmptyReportsGeneratorLogic;