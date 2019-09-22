
const SummarizedSectionsDao = require('../dao/SummarizedSectionsDao');

class SummarizedSectionsLogic {

  constructor(connection) {
    this.ssd = new SummarizedSectionsDao(connection);
  }

  getAllSummarizedSectionsTrx(trx) {
    return this.ssd.getAllSummarizedSectionsTrx(trx);
  }

  prepareDefaultBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].id,
        year: date.year,
        quarter: date.quarter
      })
    }
    return newData;
  }

  prepareBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].summarized_section_id,
        year: date.year,
        quarter: date.quarter
      })
    }
    return newData;
  }

}

module.exports = SummarizedSectionsLogic;