const Helper = require('../../helpers/Helper');
const SummarizedBudgetDao = require('../dao/SummarizedBudgetDao');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const SummarizedSectionsLogic = require('../logic/SummarizedSectionsLogic');

class SummarizedBudgetLogic {

  constructor(connection) {
    this.sbd = new SummarizedBudgetDao(connection);
    this.registeredYearsLogic = new RegisteredYearsLogic();
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic();
    this.summarizedSectionsLogic = new SummarizedSectionsLogic();
  }

  getBuildingSummarizedBudgetTrx(buildingName, date, trx) {
    return this.sbd.getBuildingSummarizedBudgetTrx(buildingName, date, trx);
  }

  updateSummarizedBudget(params) {
    params.buildingName = Helper.trimSpaces(params.buildingName);
    return this.sbd.updateSummarizedBudget(params);
  }

  updateSummarizedBudgetTrx(budgets = Array, buildingName = String, date = Object, trx) {
    //prepare the params
    const params = {
      summarized_section_id: budgets[0].summarized_section_id,
      buildingName,
      date: {
        year: date.year
      }
    }

    return this.sbd.getBuildingSummarizedBudgetSingleTrx(params, trx).then((sumBudget) => {

      const quarterBudgetLabel = `${date.quarterEng}_budget`;
      const quarterExecutionLabel = `${date.quarterEng}_execution`;

      //const monthNames = Helper.getQuarterMonths(date.quarter);


      //calculate year total budget
      //substract the previous quarter budget that will be updated
      //from total year budget and then add the new quarter budget to it
      let year_total_budget = (sumBudget[0].year_total_budget - sumBudget[0][quarterBudgetLabel]) + budgets[0].total_budget;

      //calculate year total execution
      //substract the previous quarter execution that will be updated
      //from total year execution and then add the new quarter execution to it
      let year_total_execution = (sumBudget[0].year_total_execution - sumBudget[0][quarterExecutionLabel]) + budgets[0].total_execution;

      //add the object that will be added to the database to params
      params.data = {
        [quarterBudgetLabel]: budgets[0].total_budget,//quarter budget
        [quarterExecutionLabel]: budgets[0].total_execution,//quarter execution
        year_total_budget: year_total_budget,
        year_total_execution: year_total_execution,//year execution
        notes: budgets[0].notes//notes
      };
      return this.sbd.updateSummarizedBudgetTrx(params, trx).then(() => params.data);
    }).catch(error => { throw error; });
  }

  batchInsert(buildingName, rows, trx) {
    return this.sbd.batchInsert(buildingName, rows, trx);
  }

  prepareDefaultBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].id,
        year: date.year
      })
    }
    return newData;
  }

  prepareBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].summarized_section_id,
        year: date.year
      })
    }
    return newData;
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  async createEmptyReport(buildingName, date, trx) {

    const newDate = {
      year: date.year - 1
    }

    //get all the budgets of the previous year if exists
    const sumBudgets = this.getBuildingSummarizedBudgetTrx(buildingName, newDate, trx);

    if (sumBudgets.length === 0) {
      await this.summarizedSectionsLogic.getAllSummarizedSectionsTrx(trx);
      //prepare the data for insertion
      const preparedDefaultSections = this.prepareDefaultBatchInsertion(defaultSections, date);
      //insert the batch
      await this.batchInsert(buildingName, preparedDefaultSections, trx);
    } else {
      //prepare the data for insertion
      const preparedSections = this.prepareBatchInsertion(sumBudgets, date);
      //insert the batch
      await this.batchInsert(buildingName, preparedSections, trx);
    }

    //get registered year
    const registeredYears = await this.registeredYearsLogic.getRegisteredYearTrx(buildingName, date.year, trx);

    //0 means the year does not exist and needs to be created
    if (registeredYears.length === 0) {
      await this.registeredYearsLogic.registerNewYear(buildingName, { year: date.year }, trx)
    }

    return Promise.resolve();

  }

}

module.exports = SummarizedBudgetLogic;