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
  tax: { column: 'tax', type: 'REAL' },
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
  getAllMonthExpansesTrx = (
    buildingName = String,
    date = {
      year: year = Number,
      month: month = String
    },
    pageSettings = {
      pageSize: -1,
      page: -1
    },
    trx = this.connection
  ) => {
    let data = trx.where({ year: date.year, month: date.month }).select(
      "building.id AS id",
      "building.expanses_code_id AS expanses_code_id",
      "ec.code AS code",
      "ec.codeName AS codeName",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
      "building.supplierName AS supplierName",
      "building.sum AS sum",
      "building.tax AS tax",
      "building.notes AS notes",
      "building.month AS month",
      "building.year AS year"
    ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id")
      .orderBy(['code', { column: 'codeName', order: 'asc' }])
      .limit(pageSettings.pageSize).offset(pageSettings.pageSize * pageSettings.page);

    return data.then((result) => {
      return this.nestHydrationJS.nest(result, DEFINITION);
    }).catch((error) => {
      throw error;
    });
  }

  dataRowCount(
    buildingName,
    date
  ) {
    return this.connection(`${buildingName}_month_expanses`)
      .count('id')
      .where({ year: date.year, month: date.month })
  }

  /**
   * get month expanse record by summarized section id
   */
  getMonthExpansesBySummarizedSectionIdTrx(
    buildingName = String,
    date = {
      year: year = Number,
      month: month = String
    },
    summarized_section_id = Number,
    trx
  ) {
    return trx.where({ year: date.year, month: date.month, summarized_section_id: summarized_section_id }).select(
      "building.id AS id",
      "building.expanses_code_id AS expanses_code_id",
      "building.sum AS sum",
      "building.tax AS tax",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
    ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id")
      .catch((error) => {
        throw error;
      });
  }

  /**
   * get month expanse record by summarized section id
   */
  getMonthExpansesByIdTrx(
    id = Number,
    buildingName = String,
    trx
  ) {
    return trx.where("building.id", id).select(
      "building.id AS id",
      "building.expanses_code_id AS expanses_code_id",
      "building.sum AS sum",
      "building.tax AS tax",
      "ec.code AS code",
      "ec.codeName AS codeName",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
    ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id")
      .catch((error) => {
        throw error;
      });
  }

  /**
   * update month expanse record
   * @param {*} id the id of the expanse to update
   * @param {*} buildingName the name of the building
   * @param {*} expanse the expanse to update
   */
  updateMonthExpanseTrx(buildingName = String, id = Number, expanse = Object, trx) {
    return trx(buildingName + "_month_expanses")
      .where({ id: id })
      .update(expanse)
      .catch((error) => {
        throw error;
      });
  }

  addNewMonthExpanseTrx(buildingName = String, record = Object, trx = this.connection) {
    return trx(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        throw error;
      });
  }

  deleteMonthExpanse(
    buildingName = String,
    id = Number,
    trx = this.connection
  ) {
    return trx(buildingName + "_month_expanses")
      .where({ id: id })
      .del()
      .catch((error) => {
        throw error;
      });
  }

  batchInsert(
    buildingName,
    rows,
    trx
  ) {
    return trx.batchInsert(`${buildingName}_month_expanses`, rows, rows.length)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = MonthExpansesDao;