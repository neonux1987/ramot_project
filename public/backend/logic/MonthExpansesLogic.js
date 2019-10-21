const MonthExpansesDao = require('../dao/MonthExpansesDao');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const RegisteredMonthsLogic = require('../logic/RegisteredMonthsLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const Helper = require('../../helpers/Helper');

class MonthExpansesLogic {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesDao = new MonthExpansesDao(connection);
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic();
    this.registeredMonthsLogic = new RegisteredMonthsLogic();
    this.registeredYearsLogic = new RegisteredYearsLogic();
  }

  getAllMonthExpansesTrx(buildingName, date, trx) {
    return this.monthExpansesDao.getAllMonthExpansesTrx(buildingName, date, trx);
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
    return this.updateExecution("update", params);
  }

  /**
   * add new month expanse transaction
   * @param {*} param0 
   */
  addNewMonthExpanse(params) {
    return this.saveExpanse("add", params);
  }

  async saveExpanse(action = String, { date = Object, buildingName = String, expanse = Object }) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    //get settings to get th tax value
    const settings = await this.generalSettingsLogic.getGeneralSettingsTrx(trx);

    const { tax } = settings[0];

    if (action === "update") {
      //update month expanse
      await this.updateMonthExpanseTrx(date, buildingName, expanse, trx);
    } else {
      await this.addNewMonthExpanseTrx(date, buildingName, expanse, trx);
    }

    //get the total sum of expanses that are related
    //of the same summarized section id
    const monthExpanses = await this.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, expanse.summarized_section_id, trx);

    //get budget execution after it was updated
    const budgetExecution = await this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, expanse.summarized_section_id, trx);

    //caluclate execution and prepare an object for te insertion or update
    const budgetExec = this.calculateExecution(budgetExecution, monthExpanses, date, tax);

    //update execution
    await this.budgetExecutionLogic.updateBudgetExecutionTrx(buildingName, date, expanse.summarized_section_id, budgetExec, trx);

  }

  /**
     * calculate and create a budget execution object
     * with the new execution value total execution and difference
     * @param {*} budget 
     * @param {*} monthExpanses 
     * @param {*} date 
     */
  calculateExecution(budget = Object, monthExpanses = Array, date = Object) {

    let totalSum = 0;

    //we need to calculate each expanse seperately 
    //because in a rare case, they could have 
    //different tax values
    for (let i = 0; i < monthExpanses.length; i++) {
      totalSum += Helper.calculateWithoutTax(monthExpanses[i].sum, monthExpanses[i].tax)
    }

    //subtract month's old execution value from the total execution
    budget["total_execution"] -= budget[`${date.month}_budget_execution`];
    //update month's exectuion with the new value
    budget[`${date.month}_budget_execution`] = totalSum;
    //update the total execuion wit the new month's execution value
    budget["total_execution"] += totalSum;
    //caluclate difference
    budget["difference"] = budget["total_budget"] - budget["total_execution"];

    //if there is no value in the sum, reset
    //the difference back to 0 too
    if (totalSum === 0) {
      budget["difference"] = 0.0;
    }

    //prepare budget execution object
    let BudgetExecutionObj = {
      total_execution: budget["total_execution"],
      difference: budget["difference"],
      [date.month + "_budget_execution"]: budget[date.month + "_budget_execution"]
    };

    return BudgetExecutionObj;
  }



















  addNewMonthExpanseTrx(date, buildingName, expanse, trx) {
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
    return this.med.addNewMonthExpanseTrx(buildingName, expanseToInsert, trx);
  }

  updateMonthExpanseTrx(date = Object, buildingName = String, expanse = Object, trx) {

    //prepare the expanse obejct, remove all the unneccessary 
    //fields so it can be saved.
    const expanseToUpdate = { supplierName: expanse.supplierName, sum: expanse.sum, tax: expanse.tax, notes: expanse.notes };
    //update the expanse
    return this.med.updateMonthExpanseTrx(buildingName, expanse.id, expanseToUpdate, trx)
      .then(() => {
        //get all the expanses by summarized sections id
        return this.med.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, expanse.summarized_section_id, trx);
      })
      .then((expanses) => {
        //calculate total sum of the received expanses
        const totalSum = MonthExpansesLogic.calculateExpansesSum(expanses);
        return totalSum;
      })
      .catch(error => { throw error });

  }

  static calculateExpansesSum(expanses) {
    let totalSum = 0;
    for (let i = 0; i < expanses.length; i++) {
      totalSum += expanses[i].sum;
    }
    return totalSum;
  }

  deleteMonthExpanse(params) {
    return this.med.deleteMonthExpanse(params);
  }

  batchInsert(buildingName, rows, trx) {
    return this.med.batchInsert(buildingName, rows, trx);
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  async createEmptyReport(buildingName, date, trx) {

    const monthNum = date.monthNum > 0 ? date.monthNum - 1 : 11;//if the month is 0 january, then go to month 11 december of previous year
    const year = monthNum === 11 ? date.year - 1 : date.year;//if the month is 11 december, go to previous year

    //previous date
    const newDate = {
      month: Helper.getCurrentMonthEng(monthNum),
      year: year
    }

    //get all the expanses of the previous month if exists
    const expanses = await this.getAllMonthExpansesTrx(buildingName, newDate, trx);

    //0 means there is no previous month
    if (expanses.length === 0) {
      //get the default codes
      const defaultCodes = await this.defaultExpansesCodesLogic.getDefaultExpansesCodesTrx(trx);
      //prepare the data for insertion
      this.defaultExpansesCodesLogic.prepareDefaultBatchInsertion(defaultCodes, date);
      //insert the batch
      await this.batchInsert(buildingName, defaultCodes, trx);
    } else {
      //prepare the data for insertion
      this.defaultExpansesCodesLogic.prepareBatchInsertion(expanses, date);
      //insert the batch
      await this.batchInsert(buildingName, expanses, trx);

    }

    //can safely register new year, it's not registered from other reports
    await this.registeredMonthsLogic.registerNewMonth(buildingName, {
      year: date.year,
      month: date.month,
      monthHeb: date.monthHeb
    },
      trx);

  }

}

module.exports = MonthExpansesLogic;