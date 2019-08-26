const MonthExpansesDao = require('../dao/MonthExpansesDao');

class MonthExpansesLogic {

  constructor(connection) {
    this.connection = connection;
    this.med = new MonthExpansesDao(connection);
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

  batchInsert(buildingName, rows, trx) {
    return this.med.batchInsert(buildingName, rows, trx);
  }

}

module.exports = MonthExpansesLogic;