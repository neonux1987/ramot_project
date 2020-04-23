
const SummarizedSectionsDao = require('../dao/SummarizedSectionsDao');

class SummarizedSectionsLogic {

  constructor(connection) {
    this.summarizedSectionsDao = new SummarizedSectionsDao(connection);
  }

  getAllSummarizedSectionsOrderedTrx(status) {
    return this.summarizedSectionsDao.getAllSummarizedSectionsOrderedTrx(status);
  }

  getAllSummarizedSectionsTrx(trx) {
    return this.summarizedSectionsDao.getAllSummarizedSectionsTrx(trx);
  }

  async addSummarizedSection({ summarizedSection }) {
    const result = await this.summarizedSectionsDao.getSummarizedSectionBySection(summarizedSection.section);
    const returnedSummarizedSection = result[0];

    if (returnedSummarizedSection) {
      returnedSummarizedSection.section = summarizedSection.section;
      returnedSummarizedSection.status = "active";

      await this.summarizedSectionsDao.updateSummarizedSection(returnedSummarizedSection.id, returnedSummarizedSection);

      return returnedSummarizedSection.id;
    } else {
      summarizedSection.status = "active";
      return this.summarizedSectionsDao.addSummarizedSection(summarizedSection)
        .then((result) => {
          // extract the id of the added summarized
          // section from the array to retrn only the id.
          return result[0];
        });
    }

  }

  updateSummarizedSection({ id, summarizedSection }) {
    return this.summarizedSectionsDao.updateSummarizedSection(id, summarizedSection);
  }

  deleteSummarizedSection({ id }) {
    const summarizedSection = {
      status: "deleted"
    }
    return this.summarizedSectionsDao.updateSummarizedSection(id, summarizedSection);
  }

}

module.exports = SummarizedSectionsLogic;