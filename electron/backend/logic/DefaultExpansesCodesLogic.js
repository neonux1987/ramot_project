const DefaultExpansesCodesDao = require('../dao/DefaultExpansesCodesDao');

class DefaultExpansesCodesLogic {

  constructor(connection) {
    this.dec = new DefaultExpansesCodesDao(connection);
  }

  getDefaultExpansesCodesTrx(trx,) {
    return this.dec.getDefaultExpansesCodesTrx(trx);
  }

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