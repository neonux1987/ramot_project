const connectionPool = require('../connection/ConnectionPool');

class SummarizedSectionsDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getAllSummarizedSectionsOrderedTrx(status) {
    return this.connection.select()
      .from("summarized_sections")
      .where({ status })
      .orderBy('section', 'asc')
      .catch((error) => {
        throw error;
      });
  }

  getAllSummarizedSectionsTrx(trx = this.connection) {
    return trx.select()
      .from("summarized_sections")
      .orderBy('section', 'asc')
      .catch((error) => {
        throw error;
      });
  }

  getSummarizedSectionById({ buildingName = String, year = Number, month = String, expanse = Object }) {
    let data = this.connection.where({ year: year, month: month, summarized_section_id: expanse.summarized_section_id }).select(
      "building.id AS id",
      "building.expanses_code_id AS expanses_code_id",
      "building.sum AS sum",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
    ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id");

    return data.then((result) => {
      return this.nestHydrationJS.nest(result, DEFINITION);
    }).catch((error) => {
      throw error;
    });
  }

  getSummarizedSectionBySection(section) {
    return this.connection.select()
      .from("summarized_sections")
      .where({ section })
      .catch((error) => {
        throw error;
      });
  }

  updateSummarizedSection(id = Number, summarizedSection = Object) {
    return this.connection("summarized_sections")
      .where({ id: id })
      .update(summarizedSection)
      .catch((error) => {
        throw error;
      })
  }

  addSummarizedSection(summarizedSection = Object) {
    return this.connection("summarized_sections")
      .insert(summarizedSection)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = SummarizedSectionsDao;