const MonthExpansesLogic = require('./MonthExpansesLogic');
const RegisteredReportsLogic = require('./RegisteredReportsLogic');
const SettingsLogic = require('./SettingsLogic');
const BuildingsDao = require('../dao/BuildingsDao');
const Helper = require('../../helpers/Helper');
const fse = require('fs-extra');
const path = require('path');
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

    const buildings = await this.buildingsDao.getBuidlings(trx);

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

    this.createEmptyFolderStrcture(date, buildings);
  }

  async createEmptyFolderStrcture(date, buildings) {
    const {
      year,
      quarterHeb
    } = date;

    // quarter months

    // folder names
    const yearFolderName = `שנת ${year}`;

    const locations = await this.settingsLogic.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.LOCATIONS);

    buildings.forEach(async (building) => {

      // building path
      const buildingPath = path.join(locations.reports_folder_path, building.buildingName);
      // year folder
      const yearFolder = path.join(buildingPath, yearFolderName);
      // quarter folder
      const quarterFolder = path.join(yearFolder, quarterHeb);

      // ensures that the path exists, if not
      // it will create all the dirs that don't exists
      // in the path
      await fse.ensureDir(quarterFolder);
    });

  }

  async createEmptyReportsByMonth(buildings, date, trx) {
    // create reports for each bulding
    for (let i = 0; i < buildings.length; i++) {
      await this.monthExpansesLogic.createEmptyReport(buildings[i].buildingNameEng, date, trx);
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