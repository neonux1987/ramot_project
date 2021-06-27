const DefaultExpansesCodesDao = require('../dao/DefaultExpansesCodesDao');

class DefaultExpansesCodesLogic {

  constructor(connection) {
    this.dec = new DefaultExpansesCodesDao(connection);
  }

  /**
   * get default expanses codes
   * @param {*} trx transaction object
   * @returns default expanses codes
   */
  getDefaultExpansesCodesTrx(trx,) {
    return this.dec.getDefaultExpansesCodesTrx(trx);
  }

  /**
   * preapre default batch for insertion
   * @param {*} data the data the will be mutated
   * @param {*} date for the date properties
   */
  prepareDefaultBatchInsertion(data, date) {
    for (let i = 0; i < data.length; i++) {
      data[i].month = date.month;
      data[i].year = date.year;
      data[i].tax = 0.0;
      data[i].sum = 0.0;
      data[i].supplierName = "";
      data[i].notes = "";
    }

  }

  /**
   * prepare batch for insertion
   * @param {*} data the data the will be mutated
   * @param {*} date for the date properties
   */
  prepareBatchInsertion(data, date) {
    for (let i = 0; i < data.length; i++) {
      delete data[i].id;
      delete data[i].code;
      delete data[i].codeName;
      delete data[i].summarized_section_id;
      delete data[i].section;
      data[i].month = date.month;
      data[i].year = date.year;
      data[i].tax = 0.0;
      data[i].sum = 0.0;
      data[i].supplierName = "";
      data[i].notes = "";
    }

  }

}

module.exports = DefaultExpansesCodesLogic;