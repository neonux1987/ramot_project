const MonthExpansesDao = require('../dao/MonthExpansesDao');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const RegisteredMonthsLogic = require('../logic/RegisteredMonthsLogic');
const MonthlyStatsLogic = require('../logic/MonthlyStatsLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const Helper = require('../../helpers/Helper');
const LogicError = require('../customErrors/LogicError');
const connectionPool = require('../connection/ConnectionPool');

const SPECIAL_CODE_PREFIX = "9";

class MonthExpansesLogic {

  constructor() {
    this.monthExpansesDao = new MonthExpansesDao();
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic();
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.registeredMonthsLogic = new RegisteredMonthsLogic();
    this.monthlyStatsLogic = new MonthlyStatsLogic();
    this.generalSettingsLogic = new GeneralSettingsLogic();
  }

  getAllMonthExpansesTrx(buildingName, date, trx) {
    return this.monthExpansesDao.getAllMonthExpansesTrx(buildingName, date, trx);
  }

  getMonthExpansesByRange(buildingName, date, range) {
    return this.monthExpansesDao.getMonthExpansesByRange(buildingName, date, range).then((data) => {

      return this.monthExpansesDao.dataRowCount(buildingName, date).then((count) => {
        return {
          data,
          info: {
            count: count
          }
        }
      })

    });
  }

  getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, summarized_section_id, trx) {
    return this.monthExpansesDao.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, summarized_section_id, trx);
  }

  getMonthExpansesByIdTrx(id = Number, buildingName = String, trx) {
    return this.monthExpansesDao.getMonthExpansesByIdTrx(id, buildingName, trx);
  }

  /**
    * update month expanse transaction
    * @param {*} id the id of the month expanse to update
    * @param {*} buildingName the name of the building
    * @param {*} expanseToSave the record to update with
    */
  updateMonthExpanse(params) {
    return this.saveExpanse("update", params);
  }

  /**
   * add new month expanse transaction
   * @param {*} param0 
   */
  addNewMonthExpanse(params) {
    return this.saveExpanse("add", params);
  }

  async saveExpanse(action = String, { date = Object, buildingNameEng = String, expanse = Object }) {

    // Using trx as a transaction object:
    const trx = await connectionPool.getTransaction();

    //get settings to get th tax value
    const settings = await this.generalSettingsLogic.getGeneralSettingsTrx(trx);

    const { tax } = settings[0];

    let returnMonthExpanseId = null;

    if (action === "update") {
      //prepare the expanse obejct, remove all the unneccessary 
      //fields so it can be saved.
      const expanseToUpdate = { supplierName: expanse.supplierName, sum: expanse.sum, tax: expanse.tax, notes: expanse.notes };
      //update month expanse
      returnMonthExpanseId = await this.monthExpansesDao.updateMonthExpanseTrx(buildingNameEng, expanse.id, expanseToUpdate, trx);
    } else {
      //prepare the expanse obejct, remove all the unneccessary 
      //fields so it can be saved.
      const expanseToInsert = {
        year: expanse.year,
        month: expanse.month,
        supplierName: expanse.supplierName,
        expanses_code_id: expanse.expanses_code_id,
        sum: expanse.sum,
        tax: expanse.tax,
        notes: expanse.notes
      };
      returnMonthExpanseId = await this.monthExpansesDao.addNewMonthExpanseTrx(buildingNameEng, expanseToInsert, trx);
    }

    //get the total sum of expanses that are related
    //to the same summarized section id
    const monthExpanses = await this.getMonthExpansesBySummarizedSectionIdTrx(buildingNameEng, date, expanse.summarized_section_id, trx);

    //get budget execution after it was updated
    let budgetExecution = await this.budgetExecutionLogic.getBudgetExecutionTrx(buildingNameEng, date, expanse.summarized_section_id, trx);

    // if there is no refference to a sammarized section
    // in the budget execution data for a specific date,
    // the user must add it to the data before adding/updating the 
    // month expanses data
    if (budgetExecution.length === 0) {
      trx.rollback();
      throw new LogicError("קרתה שגיאה. לא ניתן להוסיף או לעדכן שורה כל עוד הסעיף המסכם לא קיים בטבלת ביצוע מול תקציב.")
    }

    //caluclate execution and prepare an object for te insertion or update
    const budgetExec = this.prepareBudgetExecutionObj(budgetExecution[0], monthExpanses, date, tax);

    //convert the code to string and find out
    //if it start with a special prefix
    const code = JSON.stringify(expanse.code);
    const special = code.startsWith(SPECIAL_CODE_PREFIX);

    //update execution
    await this.budgetExecutionLogic.updateBudgetExecutionTrx({ buildingNameEng, date, summarized_section_id: expanse.summarized_section_id, budgetExec, special }, trx);

    return returnMonthExpanseId[0];
  }

  /**
     * calculate and create a budget execution object
     * with the new execution value total execution and difference
     * @param {*} budget 
     * @param {*} monthExpanses 
     * @param {*} date 
     */
  prepareBudgetExecutionObj(budget = Object, monthExpanses = Array, date = Object) {

    let totalSum = 0;

    //we need to calculate each expanse seperately 
    //because in a rare case, they could have 
    //different tax values
    for (let i = 0; i < monthExpanses.length; i++) {

      if (monthExpanses[i].with_vat === 1)
        totalSum += monthExpanses[i].sum;
      else
        totalSum += Helper.calculateWithoutTax(monthExpanses[i].sum, monthExpanses[i].tax);
    }

    //subtract month's old execution value from the total execution
    budget["total_execution"] = budget["total_execution"] - budget[`${date.month}_budget_execution`];
    //update the total execuion wit the new month's execution value
    budget["total_execution"] = budget["total_execution"] + totalSum;
    //set month budget execution
    budget[date.month + "_budget_execution"] = totalSum;
    //caluclate difference
    budget["difference"] = budget["total_budget"] - budget["total_execution"];

    //if there is no value in the sum, reset
    //the difference back to 0 too
    //if (totalSum === 0) {
    //  budget["difference"] = 0;
    //}

    //prepare budget execution object
    return {
      total_execution: budget["total_execution"],
      difference: budget["difference"],
      [date.month + "_budget_execution"]: budget[date.month + "_budget_execution"]
    };

  }

  async deleteMonthExpanseTrx({ buildingNameEng, date, id }) {

    // Using trx as a transaction object:
    const trx = await connectionPool.getTransaction();

    //get the month expanses object that about to be deleting
    const monthExpanseObj = await this.monthExpansesDao.getMonthExpansesByIdTrx(id, buildingNameEng, trx);

    //after we got the object it' safe to delete it from the database
    await this.monthExpansesDao.deleteMonthExpanse(buildingNameEng, id, trx);

    //get all the month expanses by summarized section id
    //in order to calculate the total outcome
    const monthExpansesList = await this.monthExpansesDao.getMonthExpansesBySummarizedSectionIdTrx(buildingNameEng, date, monthExpanseObj[0].summarized_section_id, trx);

    //get budget execution after it was updated
    let budgetExecution = await this.budgetExecutionLogic.getBudgetExecutionTrx(buildingNameEng, date, monthExpanseObj[0].summarized_section_id, trx);

    //caluclate execution and prepare an object for te insertion or update
    const budgetExec = this.prepareBudgetExecutionObj(budgetExecution[0], monthExpansesList, date);

    if (monthExpanseObj.length === 0) {
      trx.rollback();
      throw new LogicError(`השורה לא קיימת בבסיס נתונים, כנראה כבר נמחקה.`);
    }

    //convert the code to string and find out
    //if it start with a special prefix
    const code = JSON.stringify(monthExpanseObj[0].code);
    const special = code.startsWith(SPECIAL_CODE_PREFIX);

    //update execution
    await this.budgetExecutionLogic.updateBudgetExecutionTrx({ buildingNameEng, date, summarized_section_id: monthExpanseObj[0].summarized_section_id, budgetExec, special }, trx);

    return monthExpanseObj;
  }

  batchInsert(buildingName, rows, trx) {
    return this.monthExpansesDao.batchInsert(buildingNameEng, rows, trx);
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  async createEmptyReport(buildingNameEng, date, trx) {

    // Using trx as a transaction object:
    //const trx = await connectionPool.getTransaction();
    if (trx === undefined) {
      trx = await connectionPool.getTransaction()
    }

    const registeredMonth = await this.registeredMonthsLogic.getRegisteredMonthTrx(buildingNameEng, date.month, date.year, trx);

    //if the month is already registered
    //return empty promise
    if (registeredMonth.length > 0) {

      return Promise.resolve([]);
    }

    const monthNum = date.monthNum > 0 ? date.monthNum - 1 : 11;//if the month is 0 january, then go to month 11 december of previous year
    const year = monthNum === 11 ? date.year - 1 : date.year;//if the month is 11 december, go to previous year

    //previous date
    const newDate = {
      month: Helper.getCurrentMonthEng(monthNum),
      year: year
    }

    //get all the expanses of the previous month if exists
    const expanses = await this.getAllMonthExpansesTrx(buildingNameEng, newDate, trx);

    //0 means there is no previous month
    if (expanses.length === 0) {
      //get the default codes
      const defaultCodes = await this.defaultExpansesCodesLogic.getDefaultExpansesCodesTrx(trx);

      //prepare the data for insertion
      this.defaultExpansesCodesLogic.prepareDefaultBatchInsertion(defaultCodes, date);

      //insert the batch
      await this.batchInsert(buildingNameEng, defaultCodes, trx);
    } else {
      //prepare the data for insertion
      this.defaultExpansesCodesLogic.prepareBatchInsertion(expanses, date);

      //insert the batch
      await this.batchInsert(buildingNameEng, expanses, trx);
    }

    //can safely register new year, it's not registered from other reports
    await this.registeredMonthsLogic.registerNewMonth(buildingNameEng, {
      year: date.year,
      month: date.month,
      monthHeb: date.monthHeb,
      monthNum: date.monthNum,
      quarter: date.quarter
    },
      trx);

    //call to create budget execution empty report data
    await this.budgetExecutionLogic.createEmptyReport(buildingNameEng, date, trx);
  }

}

module.exports = MonthExpansesLogic;