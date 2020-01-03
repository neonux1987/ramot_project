
const SummarizedSectionsDao = require('../dao/SummarizedSectionsDao');

class SummarizedSectionsLogic {

  constructor(connection) {
    this.ssd = new SummarizedSectionsDao(connection);
  }

  getAllSummarizedSectionsOrderedTrx(trx) {
    return this.ssd.getAllSummarizedSectionsOrderedTrx(trx);
  }

  getAllSummarizedSectionsTrx(trx) {
    return this.ssd.getAllSummarizedSectionsTrx(trx);
  }

}

module.exports = SummarizedSectionsLogic;