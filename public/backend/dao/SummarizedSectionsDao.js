
class SummarizedSectionsDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get all summarized sections
   */
  getAllSummarizedSections() {
    let data = this.connection.select().from("summarized_sections");
    return data.then((result) => {
      return result;
    }).catch((error) => {
      throw error;
    });
  }

  /**
   * get summarized section record by id
   */
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

  /**
   * update summarized section record
   * @param {*} id the id of the month expanse to update
   * @param {*} buildingName the name of the building
   * @param {*} expanseToSave the record to update with
   */
  updateSummarizedSection(id = Number, buildingName = String, expanseToSave = Object) {
    let data = this.connection(buildingName + "_month_expanses")
      .where({ id: id })
      .update(expanseToSave);

    return data.then((result) => result).catch((error) => {
      console.log(error);
    })
  }

  /**
   * add new summarized section record
   * @param {*} record 
   */
  addNewSummarizedSection(record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record);
  }

}

module.exports = SummarizedSectionsDao;