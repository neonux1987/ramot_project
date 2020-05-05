const SettingsLogic = require('../logic/SettingsLogic');
const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const BuildingsDao = require('../dao/BuildingsDao');
const Helper = require('../../helpers/Helper');
const {
  exportExcel,
  getMonthExpansesFilename,
  getBudgetExecutionFilename,
  getSummarizedBudgetsFilename
} = require('../services/excel/excelSvc');

class ExcelLogic {

  constructor() {
    this.settingsLogic = new SettingsLogic();
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.buildingsDao = new BuildingsDao();
  }

  async generateExcelReports(byQuarter, ByMonth, date) {
    const locations = this.settingsLogic.getSpecificSetting("locations");

    const buildings = await this.buildingsDao.getBuidlings();

    if (byQuarter) {
      const quarterMonths = Helper.getQuarterMonths(date.quarter);


      await asyncForEach(quarterMonths, async (month) => {

        await asyncForEach(buildings, async (building) => {
          const { buildingName, buildingNameEng } = building;
          //exportExcel(buildingName, buildingNameEng, "monthExpanses", fileName, date, data);
        });
      });


    }



    //exportExcel(buildingName, buildingNameEng, pageName, fileName, date, data);


  }

}


module.exports = ExcelLogic;