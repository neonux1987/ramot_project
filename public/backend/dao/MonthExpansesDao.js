const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const NestHydrationJS = require('nesthydrationjs');
const connectionPool = require('../connection/ConnectionPool');

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

const CHUNKSIZE = 100;
const FILENAME = "MonthExpansesDao.js"

class MonthExpansesDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
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
      .orderBy(['code', { column: 'codeName', order: 'asc' }]);

    return data.then((result) => {
      return this.nestHydrationJS.nest(result, DEFINITION);
    })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של הוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getMonthExpansesByRange = (
    buildingName = String,
    date = {
      year: year = Number,
      month: month = String
    },
    pageSettings = {
      pageSize: 100,
      startElement: 0
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
      .limit(pageSettings.pageSize).offset(pageSettings.startElement);

    return data.then((result) => {
      return this.nestHydrationJS.nest(result, DEFINITION);
    })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של הוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי טווח`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  dataRowCount(
    buildingName,
    date
  ) {
    return this.connection(`${buildingName}_month_expanses`)
      .count('id')
      .where({ year: date.year, month: date.month })
      .then((result) => {
        return result[0]['count(`id`)'];
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף מידע לגבי מספר השורות בהוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי טווח`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
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
    trx = this.connection
  ) {
    return trx.where({ year: date.year, month: date.month, summarized_section_id: summarized_section_id }).select(
      "building.id AS id",
      "building.expanses_code_id AS expanses_code_id",
      "building.sum AS sum",
      "building.tax AS tax",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
      "ec.with_vat AS with_vat"
    ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של הוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי סעיף מסכם ${summarized_section_id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getMonthExpansesByMonthsAndSummarizedSectionId(
    buildingName = String,
    months = [],
    summarized_section_id = Number
  ) {
    return this.connection
      .whereIn("month", months)
      .andWhere("summarized_section_id", summarized_section_id)
      .select(
        "building.id AS id",
        "building.expanses_code_id AS expanses_code_id",
        "building.sum AS sum",
        "building.tax AS tax",
        "sc.id AS summarized_section_id",
        "sc.section AS section",
      ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של הוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי סעיף מסכם ${summarized_section_id} ולפי החודשים`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
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
        const msg = `המערכת לא הצליחה לשלוף נתונים של רשומה בהוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי המזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
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
        const msg = `המערכת לא הצליחה לעדכן רשומה בהוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי מזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  addNewMonthExpanseTrx(buildingName = String, record = Object, trx = this.connection) {
    return trx(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה להוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
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
        const msg = `המערכת לא הצליחה למחוק רשומה בהוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי מזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  deleteMonthExpansesBulkByIds(
    buildingName = String,
    ids,
    trx = this.connection
  ) {
    return trx(buildingName + "_month_expanses")
      .whereIn("id", ids)
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק רשומות בהוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי המזההים ${ids}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  batchInsert(
    buildingName,
    rows,
    trx
  ) {
    return trx.batchInsert(`${buildingName}_month_expanses`, rows, CHUNKSIZE)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות להוצאות חודשיות לבניין ${buildingName} לחודש ${date.month} שנה ${date.year} לפי המזההים ${ids}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = MonthExpansesDao;