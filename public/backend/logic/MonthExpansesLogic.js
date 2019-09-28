const MonthExpansesDao = require('../dao/MonthExpansesDao');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const RegisteredMonthsLogic = require('../logic/RegisteredMonthsLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const Helper = require('../../helpers/Helper');

class MonthExpansesLogic {

  constructor(connection) {
    this.connection = connection;
    this.med = new MonthExpansesDao(connection);
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic();
    this.registeredMonthsLogic = new RegisteredMonthsLogic();
    this.registeredYearsLogic = new RegisteredYearsLogic();
  }

  getAllMonthExpansesTrx(buildingName, date, trx) {
    return this.med.getAllMonthExpansesTrx(buildingName, date, trx);
  }

  getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, summarized_section_id, trx) {
    return this.med.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, summarized_section_id, trx);
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
    return this.med.addNewMonthExpanseTrx(buildingName, expanseToInsert, trx)
      .then((returnedExpanse) => {
        //get all the expanses by summarized sections id
        return returnedExpanse;
      })
      .catch(error => { throw error });
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

  batchInsert(buildingName, month, rows, trx) {
    return this.med.batchInsert(buildingName, month, rows, trx);
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  createMonthEmptyExpanses(buildingName, date, trx) {

    const monthNum = date.monthNum > 0 ? date.monthNum - 1 : 11;//if the month is 0 january, then go to month 11 december of previous year
    const year = monthNum === 11 ? date.year - 1 : date.year;//if the month is 11 december, go to previous year

    const newDate = {
      month: Helper.getCurrentMonthEng(monthNum),
      year: year
    }

    return this.getAllMonthExpansesTrx(buildingName, newDate, trx).then((expanses) => {
      if (expanses.length === 0) {
        return this.defaultExpansesCodesLogic.getDefaultExpansesCodesTrx(trx).then((defaultCodes) => {
          //prepare the data for insertion
          this.defaultExpansesCodesLogic.prepareDefaultBatchInsertion(defaultCodes, date);
          //insert the batch
          return this.med.batchInsert(buildingName, defaultCodes, trx).then(() => {
            return this.getAllMonthExpansesTrx(buildingName, date, trx);
          });
        });//end default expanses codes logic
      } else {
        //prepare the data for insertion
        this.defaultExpansesCodesLogic.prepareBatchInsertion(expanses, date);
        //insert the batch
        return this.med.batchInsert(buildingName, expanses, trx).then(() => {
          return this.getAllMonthExpansesTrx(buildingName, date, trx);
        });
      }

    })//end month expanses logic
      .then((expanses) => {
        return this.registeredMonthsLogic.registerNewMonth(buildingName, {
          year: date.year,
          month: date.month,
          monthHeb: date.monthHeb
        },
          trx).then(() => {
            return this.registeredYearsLogic.registerNewYear(buildingName, { year: date.year }, trx)
              .then(() => expanses);
          });
      });

  }

}

module.exports = MonthExpansesLogic;