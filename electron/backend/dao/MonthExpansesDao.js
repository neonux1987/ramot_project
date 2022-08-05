const DbError = require("../customErrors/DbError");
const NestHydrationJS = require("nesthydrationjs");
const connectionPool = require("../connection/ConnectionPool");

const DEFINITION = [
  {
    id: { column: "id", type: "NUMBER" },
    expanses_code_id: { column: "expanses_code_id", type: "NUMBER" },
    code: { column: "code", type: "NUMBER" },
    codeName: "codeName",
    summarized_section_id: { column: "summarized_section_id", type: "NUMBER" },
    section: "section",
    supplierName: "supplierName",
    sum: { column: "sum", type: "REAL" },
    tax: { column: "tax", type: "REAL" },
    notes: "notes",
    month: "month",
    year: { column: "year", type: "INTEGER" }
  }
];

const CHUNKSIZE = 100;
const FILENAME = "MonthExpansesDao.js";

class MonthExpansesDao {
  constructor() {
    this.connection = connectionPool.getConnection();
    this.nestHydrationJS = new NestHydrationJS();
  }

  /**
   * get all month expanses records
   */
  getAllMonthExpansesTrx = (
    buildingId = String,
    date = {
      year: (year = Number),
      month: (month = String)
    },
    trx = this.connection
  ) => {
    let data = trx
      .where({ year: date.year, month: date.month })
      .select(
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
      )
      .from(buildingId + "_month_expanses AS building")
      .innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin(
        "summarized_sections AS sc",
        "ec.summarized_section_id",
        "sc.id"
      )
      .orderBy(["code", { column: "codeName", order: "asc" }]);

    return data
      .then((result) => {
        return this.nestHydrationJS.nest(result, DEFINITION);
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של הוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  };

  getMonthExpansesByRange = (
    buildingId = String,
    date = {
      year: (year = Number),
      month: (month = String)
    },
    pageSettings = {
      pageSize: 100,
      startElement: 0
    },
    trx = this.connection
  ) => {
    let data = trx
      .where({ year: date.year, month: date.month })
      .select(
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
      )
      .from(buildingId + "_month_expanses AS building")
      .innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin(
        "summarized_sections AS sc",
        "ec.summarized_section_id",
        "sc.id"
      )
      .orderBy(["code", { column: "codeName", order: "asc" }])
      .limit(pageSettings.pageSize)
      .offset(pageSettings.startElement);

    return data
      .then((result) => {
        return this.nestHydrationJS.nest(result, DEFINITION);
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של הוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year} לפי טווח`;
        throw new DbError(msg, FILENAME, error);
      });
  };

  dataRowCount(buildingId, date) {
    return this.connection(`${buildingId}_month_expanses`)
      .count("id")
      .where({ year: date.year, month: date.month })
      .then((result) => {
        return result[0]["count(`id`)"];
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף מידע לגבי מספר השורות בהוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year} לפי טווח`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getMonthExpansesBySummarizedSectionIdTrx(
    buildingId = String,
    date = {
      year: (year = Number),
      month: (month = String)
    },
    summarized_section_id = Number,
    trx = this.connection
  ) {
    return trx
      .where({
        year: date.year,
        month: date.month,
        summarized_section_id: summarized_section_id
      })
      .select(
        "building.id AS id",
        "building.expanses_code_id AS expanses_code_id",
        "building.sum AS sum",
        "building.tax AS tax",
        "sc.id AS summarized_section_id",
        "sc.section AS section",
        "ec.with_vat AS with_vat"
      )
      .from(buildingId + "_month_expanses AS building")
      .innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin(
        "summarized_sections AS sc",
        "ec.summarized_section_id",
        "sc.id"
      )
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של הוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year} לפי סעיף מסכם ${summarized_section_id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getMonthExpansesByIdTrx({ id = Number, buildingId = String, date, trx }) {
    return trx
      .where("building.id", id)
      .select(
        "building.id AS id",
        "building.expanses_code_id AS expanses_code_id",
        "building.sum AS sum",
        "building.tax AS tax",
        "ec.code AS code",
        "ec.codeName AS codeName",
        "sc.id AS summarized_section_id",
        "sc.section AS section"
      )
      .from(buildingId + "_month_expanses AS building")
      .innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin(
        "summarized_sections AS sc",
        "ec.summarized_section_id",
        "sc.id"
      )
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של רשומה בהוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year} לפי המזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  updateMonthExpanseTrx({
    buildingId = String,
    id = Number,
    expanse = Object,
    trx
  }) {
    return trx(buildingId + "_month_expanses")
      .where({ id: id })
      .update(expanse)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בהוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year} לפי מזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  addNewMonthExpanseTrx({
    buildingId = String,
    record = Object,
    trx = this.connection,
    date
  }) {
    return trx(buildingId + "_month_expanses")
      .insert(record)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה להוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  deleteMonthExpanse({
    buildingId = String,
    id = Number,
    trx = this.connection,
    date
  }) {
    return trx(buildingId + "_month_expanses")
      .where({ id: id })
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק רשומה בהוצאות חודשיות לבניין ${buildingId} לחודש ${date.month} שנה ${date.year} לפי מזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  batchInsert(buildingId, rows, trx) {
    return trx
      .batchInsert(`${buildingId}_month_expanses`, rows, CHUNKSIZE)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות להוצאות חודשיות לבניין ${buildingId}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = MonthExpansesDao;
