const MonthExpansesLogic = require('./MonthExpansesLogic');
const RegisteredReportsLogic = require('./RegisteredReportsLogic');
const MenuDao = require('../dao/MenuDao');
const Helper = require('../../helpers/Helper');
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

    // all the months of the chosen quarter
    const months = Helper.getQuarterMonthsNum(date.quarter);

    let reports = await this.registeredReportsLogic.getRegisteredReportsByYearAndQuarter(date.year, date.quarter, trx);
    if (reports.length > 0) {
      await trx.commit();
      throw new Error("הפעולה נכשלה. הדוחות לתאריכים שנבחרו כבר קיימים בבסיס נתונים.");
    }

    const buildings = await this.menuDao.getMenu(trx);

    for (let i = 0; i < months.length; i++) {
      const dateCopy = { ...date };

      // set the new month
      dateCopy.monthNum = months[i];
      dateCopy.month = Helper.getCurrentMonthEng(months[i]);
      dateCopy.monthHeb = Helper.getCurrentMonthHeb(months[i]);

      // create empty reports for the specific month
      await this.createEmptyReportsByMonth(buildings, dateCopy, trx);

      // register new report
      await this.registereNewReport(dateCopy, trx);
    }

    await trx.commit();
  }

  async createEmptyReportsByMonth(buildings, date, trx) {
    // create reports for each bulding
    for (let i = 0; i < buildings.length; i++) {
      await this.monthExpansesLogic.createEmptyReport(buildings[i].engLabel, date, trx);
    }
  }

  async registereNewReport(date, trx) {
    // register the date of the new reports
    await this.registeredReportsLogic.addNewReport({
      year: date.year,
      month: date.monthNum,
      quarter: date.quarter
    }, trx);
  }

}

module.exports = EmptyReportsGeneratorLogic;