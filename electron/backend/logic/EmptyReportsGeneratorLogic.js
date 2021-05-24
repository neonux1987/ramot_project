const MonthExpansesLogic = require('./MonthExpansesLogic');
const RegisteredReportsLogic = require('./RegisteredReportsLogic');
const SettingsLogic = require('./SettingsLogic');
const BuildingsDao = require('../dao/BuildingsDao');
const Helper = require('../../helpers/Helper');
const LogicError = require('../customErrors/LogicError');
const connectionPool = require('../connection/ConnectionPool');
const { asyncForEach } = require('../../helpers/utils');

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
  async generateEmptyReports({ buildings, date, fromPreviousReports }) {
    // Using trx as a transaction object:
    const trx = await connectionPool.getTransaction();

    const existingReportsBuidlings = [];

    await asyncForEach(buildings, async ({ buildingId, buildingName }) => {
      let reports = await this.registeredReportsLogic.getRegisteredReportsByYearAndQuarter(buildingId, date.year, date.quarter, trx);

      // only reports for unregistered dates allowed
      if (reports.length === 0)
        await this.createEmptyReportsByMonth(buildingId, date, fromPreviousReports, trx);
      else
        existingReportsBuidlings.push(buildingName);
    });

    await trx.commit();

    return existingReportsBuidlings;
  }

  async createEmptyReportsByMonth(buildingId, date, fromPreviousReports, trx) {
    // all the months of the chosen quarter
    const months = Helper.getQuarterMonthsNum(date.quarter);

    for (let i = 0; i < months.length; i++) {
      const dateCopy = { ...date };

      // set the new month
      dateCopy.monthNum = months[i];
      dateCopy.month = Helper.getCurrentMonthEng(months[i]);
      dateCopy.monthHeb = Helper.getCurrentMonthHeb(months[i]);

      // create empty reports for the specific month
      await this.monthExpansesLogic.createEmptyReport(buildingId, dateCopy, fromPreviousReports, trx);

      // register new report
      await this.registereNewReport(buildingId, dateCopy, trx);
    }

  }

  async registereNewReport(buildingId, date, trx) {
    // register the date of the new reports
    await this.registeredReportsLogic.addNewReport({
      buildingId,
      year: date.year,
      month: date.monthNum,
      quarter: date.quarter
    }, trx);
  }

}

module.exports = EmptyReportsGeneratorLogic;