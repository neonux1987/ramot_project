const NestHydrationJS = require('nesthydrationjs');

const DEFINITION = [{
  id: { column: 'id', type: 'NUMBER' },
  expanses_code_id: { column: 'expanses_code_id', type: 'NUMBER' },
  code: { column: 'code', type: 'NUMBER' },
  codeName: 'codeName',
  summarized_section_id: { column: 'summarized_section_id', type: 'NUMBER' },
  section: 'section',
  supplierName: 'supplierName',
  sum: { column: 'sum', type: 'REAL' },
  notes: 'notes',
  month: 'month',
  year: { column: 'year', type: 'INTEGER' }
}];

class MonthExpansesDao {

  constructor(connection) {
    this.connection = connection;
    this.nestHydrationJS = new NestHydrationJS();
  }

  /**
   * get all month expanses records
   */
  getAllMonthExpanses({ buildingName = String, year = Number, month = String }) {
    let data = this.connection.where({ year: year, month: month }).select(
      "building.id AS id",
      "building.expanses_code_id AS expanses_code_id",
      "ec.code AS code",
      "ec.codeName AS codeName",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
      "building.supplierName AS supplierName",
      "building.sum AS sum",
      "building.notes AS notes",
      "building.month AS month",
      "building.year AS year"
    ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id");

    return data.then((result) => {
      return this.nestHydrationJS.nest(result, DEFINITION);
    });
  }

  /**
   * get month expanse record by summarized section id
   */
  getMonthExpansesBySummarizedSectionId({ buildingName = String, year = Number, month = String, expanse = Object }) {
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
   * update month expanse record
   * @param {*} id the id of the month expanse to update
   * @param {*} buildingName the name of the building
   * @param {*} expanseToSave the record to update with
   */
  updateMonthExpanse(id = Number, buildingName = String, expanseToSave = Object) {
    let data = this.connection(buildingName + "_month_expanses")
      .where({ id: id })
      .update(expanseToSave);

    return data.then((result) => result).catch((error) => {
      console.log(error);
    })
  }

  addNewMonthExpanse(buildingName = String, record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record);
  }

}

module.exports = MonthExpansesDao;