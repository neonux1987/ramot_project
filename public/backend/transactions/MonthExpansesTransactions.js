const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const MonthTotalLogic = require('../logic/MonthTotalLogic');
const QuarterTotalLogic = require('../logic/QuarterTotalLogic');
const YearTotalLogic = require('../logic/YearTotalLogic');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const RegisteredMonthsLogic = require('../logic/RegisteredMonthsLogic');
const RegisteredQuartersLogic = require('../logic/RegisteredQuartersLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const Helper = require('../../helpers/Helper');

const SPECIAL_CODE_PREFIX = "9";

class MonthExpansesTransactions {

  constructor(connection) {
    this.connection = connection;
    this.monthExpansesLogic = new MonthExpansesLogic(connection);
    this.budgetExecutionLogic = new BudgetExecutionLogic(connection);
    this.summarizedBudgetLogic = new SummarizedBudgetLogic(connection);
    this.generalSettingsLogic = new GeneralSettingsLogic(connection);
    this.monthTotalLogic = new MonthTotalLogic(connection);
    this.quarterTotalLogic = new QuarterTotalLogic(connection);
    this.yearTotalLogic = new YearTotalLogic(connection);
    this.registeredMonthsLogic = new RegisteredMonthsLogic(connection);
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
    this.registeredYearsLogic = new RegisteredYearsLogic(connection);
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic(connection);
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
    return this.updateExecution("add", params);
  }

  async updateExecution(action = String, { date = Object, buildingName = String, expanse = Object }) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    //get settings to get th tax value
    const settings = await this.generalSettingsLogic.getGeneralSettingsTrx(trx);

    const { tax } = settings[0];

    //update expanse object tax field to the latest current tax value
    expanse.tax = tax;

    if (action === "update") {
      //update month expanse
      await this.monthExpansesLogic.updateMonthExpanseTrx(date, buildingName, expanse, trx);
    } else {
      await this.monthExpansesLogic.addNewMonthExpanseTrx(date, buildingName, expanse, trx);
    }

    //get the total sum of expanses that are related
    //of the same summarized section id
    const monthExpanses = await this.monthExpansesLogic.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, expanse.summarized_section_id, trx);

    //update execution
    await this.budgetExecutionLogic.updateExecutionTrx(monthExpanses, buildingName, date, expanse.summarized_section_id, tax, trx);

    //get budget execution after it was updated
    const budgetExecution = await this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, date, expanse.summarized_section_id, trx);

    //update summarized budget data
    await this.summarizedBudgetLogic.updateSummarizedBudgetTrx(budgetExecution, buildingName, date, trx);

    //convert the code to string in order to use the startsWith method
    //to find if it's a special code
    const code = expanse.code + "";

    //basically don't count the special codes in the total execution row
    if (!code.startsWith(SPECIAL_CODE_PREFIX)) {

      const allBudgetExecs = await this.budgetExecutionLogic.getAllBudgetExecutionsTrx(buildingName, date, trx);

      //calculate total execution for quarter months
      const calculatedObj = BudgetExecutionLogic.calculateTotalExec(date.month, allBudgetExecs);

      //update month total execution (total expanses)
      await this.monthTotalLogic.updateMonthTotalTrx(buildingName, date, {
        total_expanses: calculatedObj.monthTotalExecution
      }, trx);

      //update quarter total execution (total expanses)
      await this.quarterTotalLogic.updateQuarterTotalTrx(buildingName, date, {
        total_expanses: calculatedObj.totalExecution
      }, trx);

      //get year total budget expanses
      const summarizedBudgets = await this.summarizedBudgetLogic.getBuildingSummarizedBudgetTrx(buildingName, date, trx);

      //calculate year total budget and execution
      const summarizedCalculatedObj = SummarizedBudgetLogic.calculateTotalExec(date.year, summarizedBudgets);

      //update year total execution
      const returnedPromise = await this.yearTotalLogic.updateYearTotalTrx(buildingName, date, {
        total_expanses: summarizedCalculatedObj.totalExecution
      }, trx);

      //commit changes
      trx.commit();

      return returnedPromise;
    }

  }

  async deleteExpanse({ id = Number, buildingName = String }) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    //update month expanse
    const expanse = await this.monthExpansesLogic.getMonthExpansesByIdTrx(id, buildingName, trx);

    const quarter = Helper.getQuarterFromMonthEng(expanse.month);

    //get budget execution after it was updated
    const budgetExecution = await this.budgetExecutionLogic.getBudgetExecutionTrx(buildingName, { year: expanse.year, quarter: quarter }, expanse.summarized_section_id, trx);

    //calculate new budget execution values to be updated
    const budgetExecCalcObj = this.budgetExecutionLogic.deductExpanse(expanse, budgetExecution);

    //update execution
    await this.budgetExecutionLogic.updateExecutionTrx(monthExpanses, buildingName, date, expanse.summarized_section_id, tax, trx);


  }

  /**
  * creates empty report for the new month
  * @param {*} buildingName 
  * @param {*} date 
  */
  async createEmptyReport(buildingName, date) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    const registeredMonth = await this.registeredMonthsLogic.getRegisteredMonthTrx(buildingName, date.month, date.year, trx);
    const registeredQuarter = await this.registeredQuartersLogic.getRegisteredQuarterTrx(buildingName, date.quarter, date.year, trx);
    const registeredYear = await this.registeredYearsLogic.getRegisteredYearTrx(buildingName, date.year, trx);

    if (registeredMonth.length === 0) {
      //create month expanses
      await this.monthExpansesLogic.createEmptyReport(buildingName, date, trx);
    }

    if (registeredQuarter.length === 0) {
      await this.budgetExecutionLogic.createEmptyReport(buildingName, date, trx);
    }

    if (registeredYear.length === 0) {
      await this.summarizedBudgetLogic.createEmptyReport(buildingName, date, trx);
    }

    const monthExpanses = await this.monthExpansesLogic.getAllMonthExpansesTrx(buildingName, date, trx);

    trx.commit();

    return monthExpanses;

  }

}

module.exports = MonthExpansesTransactions;