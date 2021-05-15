const MonthExpansesLogic = require('./MonthExpansesLogic');
const RegisteredReportsLogic = require('./RegisteredReportsLogic');
const SettingsLogic = require('./SettingsLogic');
const BuildingsDao = require('../dao/BuildingsDao');
const Helper = require('../../helpers/Helper');
const LogicError = require('../customErrors/LogicError');
const connectionPool = require('../connection/ConnectionPool');

class EmptyReportsGeneratorLogic {

  constructor() {
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.registeredReportsLogic = new RegisteredReportsLogic();
    this.settingsLogic = new SettingsLogic();
    this.buildingsDao = new BuildingsDao();
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  async generateEmptyReports({ date, buildings }) {
    // Using trx as a transaction object:
    const trx = await connectionPool.getTransaction();

    // all the months of the chosen quarter
    const months = Helper.getQuarterMonthsNum(date.quarter);

    let reports = await this.registeredReportsLogic.getRegisteredReportsByYearAndQuarter(date.year, date.quarter, trx);
    if (reports.length > 0) {
      await trx.rollback();

      throw new LogicError("הפעולה נכשלה. הדוחות לתאריכים שנבחרו כבר קיימים בבסיס נתונים.");
    }

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
      await this.monthExpansesLogic.createEmptyReport(buildings[i].buildingId, date, trx);
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