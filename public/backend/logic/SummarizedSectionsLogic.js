
const SummarizedSectionsDao = require('../dao/SummarizedSectionsDao');

class SummarizedSectionsLogic {

  constructor(connection) {
    this.ssd = new SummarizedSectionsDao(connection);
  }

  getAllSummarizedSections() {
    return this.ssd.getAllSummarizedSections();
  }

}

module.exports = SummarizedSectionsLogic;