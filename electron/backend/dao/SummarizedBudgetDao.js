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
    notes: "notes",
    month: "month",
    year: { column: "year", type: "INTEGER" }
  }
];

const CHUNKSIZE = 100;
const FILENAME = "SummarizedBudgetDao.js";

class SummarizedBudgetDao {
  constructor() {
    this.connection = connectionPool.getConnection();
    this.nestHydrationJS = new NestHydrationJS();
  }

  getBuildingSummarizedBudgetTrx(
    buildingName = String,
    date = {
      year: Number
    },
    trx = this.connection
  ) {
    return trx
      .select(
        "building.id AS id",
        "building.year AS year",
        "sc.id AS summarized_section_id",
        "sc.section AS section",
        "building.quarter1_budget AS quarter1_budget",
        "building.quarter1_execution AS quarter1_execution",
        "building.quarter2_budget AS quarter2_budget",
        "building.quarter2_execution AS quarter2_execution",
        "building.quarter3_budget AS quarter3_budget",
        "building.quarter3_execution AS quarter3_execution",
        "building.quarter4_budget AS quarter4_budget",
        "building.quarter4_execution AS quarter4_execution",
        "building.evaluation AS evaluation",
        "building.year_total_budget AS year_total_budget",
        "building.year_total_execution AS year_total_execution",
        "building.notes AS notes"
      )
      .where({ year: date.year })
      .from(buildingName + "_summarized_budget AS building")
      .innerJoin(
        "summarized_sections AS sc",
        "building.summarized_section_id",
        "sc.id"
      )
      .orderBy("section")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סיכום שנתי לבניין ${buildingName} לפי שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getAll(
    buildingName = String,
    date = {
      year: (year = Number),
      month: (month = String)
    },
    trx = this.connection
  ) {
    return trx
      .select(
        "building.id AS id",
        "building.year AS year",
        "sc.id AS summarized_section_id",
        "sc.section AS section",
        "building.quarter1_budget AS quarter1_budget",
        "building.quarter1_execution AS quarter1_execution",
        "building.quarter2_budget AS quarter2_budget",
        "building.quarter2_execution AS quarter2_execution",
        "building.quarter3_budget AS quarter3_budget",
        "building.quarter3_execution AS quarter3_execution",
        "building.quarter4_budget AS quarter4_budget",
        "building.quarter4_execution AS quarter4_execution",
        "building.evaluation AS evaluation",
        "building.year_total_budget AS year_total_budget",
        "building.year_total_execution AS year_total_execution",
        "building.notes AS notes"
      )
      .where({ year: date.year })
      .from(buildingName + "_summarized_budget AS building")
      .innerJoin(
        "summarized_sections AS sc",
        "building.summarized_section_id",
        "sc.id"
      )
      .orderBy("section")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סיכום שנתי לבניין ${buildingName} לפי שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getSummarizedBudgetsByRange(
    buildingName = String,
    fromYear,
    toYear,
    trx = this.connection
  ) {
    return trx
      .select(
        "building.id AS id",
        "building.year AS year",
        "sc.id AS summarized_section_id",
        "sc.section AS section",
        "building.quarter1_budget AS quarter1_budget",
        "building.quarter1_execution AS quarter1_execution",
        "building.quarter2_budget AS quarter2_budget",
        "building.quarter2_execution AS quarter2_execution",
        "building.quarter3_budget AS quarter3_budget",
        "building.quarter3_execution AS quarter3_execution",
        "building.quarter4_budget AS quarter4_budget",
        "building.quarter4_execution AS quarter4_execution",
        "building.evaluation AS evaluation",
        "building.year_total_budget AS year_total_budget",
        "building.year_total_execution AS year_total_execution",
        "building.notes AS notes"
      )
      .whereBetween("year", [fromYear, toYear])
      .from(buildingName + "_summarized_budget AS building")
      .innerJoin(
        "summarized_sections AS sc",
        "building.summarized_section_id",
        "sc.id"
      )
      .orderBy("section", "desc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סיכום שנתי לבניין ${buildingName} מ- ${fromYear} עד- ${toYear}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getSummarizedBudgetTopIncomeOutcome(
    buildingName = String,
    fromYear,
    toYear,
    limit = 10,
    trx = this.connection
  ) {
    return (
      trx
        .select(
          "building.id AS id",
          "building.year AS year",
          "sc.id AS summarized_section_id",
          "sc.section AS section",
          "building.year_total_budget AS income",
          "building.year_total_execution AS outcome"
        )
        .whereBetween("year", [fromYear, toYear])
        .from(buildingName + "_summarized_budget AS building")
        .innerJoin(
          "summarized_sections AS sc",
          "building.summarized_section_id",
          "sc.id"
        )
        .orderBy([{ column: "building.year_total_execution", order: "desc" }])
        //.groupBy('building.summarized_section_id')
        .limit(limit)
        .catch((error) => {
          const msg = `המערכת לא הצליחה לשלוף נתוני טופ סיכום שנתי לבניין ${buildingName} מ- ${fromYear} עד- ${toYear}`;
          throw new DbError(msg, FILENAME, error);
        })
    );
  }

  getSummarizedBudgetByIdTrx(
    summarized_section_id = Number,
    buildingName = String,
    date = {
      year: Number
    },
    trx = Function
  ) {
    let data = trx(
      "building.id AS id",
      "building.year AS year",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
      "building.quarter1_budget AS quarter1_budget",
      "building.quarter1_execution AS quarter1_execution",
      "building.quarter2_budget AS quarter2_budget",
      "building.quarter2_execution AS quarter2_execution",
      "building.quarter3_budget AS quarter3_budget",
      "building.quarter3_execution AS quarter3_execution",
      "building.quarter4_budget AS quarter4_budget",
      "building.quarter4_execution AS quarter4_execution",
      "building.evaluation AS evaluation",
      "building.year_total_budget AS year_total_budget",
      "building.year_total_execution AS year_total_execution",
      "building.notes AS notes"
    )
      .where({ year: date.year, summarized_section_id: summarized_section_id })
      .from(buildingName + "_summarized_budget AS building")
      .innerJoin(
        "summarized_sections AS sc",
        "building.summarized_section_id",
        "sc.id"
      );

    return data
      .then((result) => {
        return result;
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מנתוני סיכום שנתי לבניין ${buildingName} לפי שנה ${date.year} לפי מזהה ${summarized_section_id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  addSummarizedBudgetTrx(buildingName, payload, trx = this.connection) {
    return trx(buildingName + "_summarized_budget")
      .insert(payload)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לנתוני סיכום שנתי לבניין ${buildingName}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  deleteSummarizedBudgetTrx(buildingName = String, year, id = Number, trx) {
    return trx(buildingName + "_summarized_budget")
      .where({ id, year })
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק רשומה מנתוני סיכום שנתי לבניין ${buildingName} לפי שנה ${year} לפי מזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  deleteBySummarizedSectionIdTrx(
    buildingName = String,
    year,
    summarized_section_id = Number,
    trx
  ) {
    return trx(buildingName + "_summarized_budget")
      .where({ summarized_section_id, year })
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק רשומה מנתוני סיכום שנתי לבניין ${buildingName} לפי שנה ${year} לפי מזהה סעיף מסכם ${summarized_section_id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  /**
   * update expanse code record
   * @param {*} data
   */
  updateSummarizedBudgetTrx(
    summarized_section_id = Number,
    buildingName = String,
    data = {
      quarter1_budget: Number,
      quarter1_execution: Number,
      quarter2_budget: Number,
      quarter2_execution: Number,
      quarter3_budget: Number,
      quarter3_execution: Number,
      quarter4_budget: Number,
      quarter4_execution: Number,
      year_total_budget: Number,
      year_total_execution: Number,
      notes: String
    },
    date = {
      year: Number
    },
    trx = this.connection
  ) {
    return trx(`${buildingName}_summarized_budget`)
      .where({ summarized_section_id: summarized_section_id, year: date.year })
      .update(data)
      .then((result) => {
        if (result === 0) {
          const msg = `${summarized_section_id} לא קיימת רשומה עם מספר זיהוי`;
          throw new DbError(msg, FILENAME, error);
        }
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בנתוני סיכום שנתי לבניין ${buildingName} לפי שנה ${date.year} לפי מזהה סעיף מסכם ${summarized_section_id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  batchInsert(buildingName, rows, trx) {
    return trx
      .batchInsert(`${buildingName}_summarized_budget`, rows, CHUNKSIZE)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות בנתוני סיכום שנתי לבניין ${buildingName}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  dataRowCount(buildingName, date) {
    return this.connection(`${buildingName}_summarized_budget`)
      .count("id")
      .where({ year: date.year })
      .then((result) => {
        return result[0]["count(`id`)"];
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף מידע אודות מספר השורות בנתוני סיכום שנתי לבניין ${buildingName} לפי שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = SummarizedBudgetDao;
