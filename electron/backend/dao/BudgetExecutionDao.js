const NestHydrationJS = require("nesthydrationjs");
const connectionPool = require("../connection/ConnectionPool");
const DbError = require("../customErrors/DbError");

const quarter1 = [
  "exec.january_budget_execution AS january_budget_execution",
  "exec.january_budget AS january_budget",
  "exec.february_budget_execution AS february_budget_execution",
  "exec.february_budget AS february_budget",
  "exec.march_budget_execution AS march_budget_execution",
  "exec.march_budget AS march_budget"
];

const quarter2 = [
  "exec.april_budget_execution AS april_budget_execution",
  "exec.april_budget AS april_budget",
  "exec.may_budget_execution AS may_budget_execution",
  "exec.may_budget AS may_budget",
  "exec.june_budget_execution AS june_budget_execution",
  "exec.june_budget AS june_budget"
];

const quarter3 = [
  "exec.july_budget_execution AS july_budget_execution",
  "exec.july_budget AS july_budget",
  "exec.august_budget_execution AS august_budget_execution",
  "exec.august_budget AS august_budget",
  "exec.september_budget_execution AS september_budget_execution",
  "exec.september_budget AS september_budget"
];

const quarter4 = [
  "exec.october_budget_execution AS october_budget_execution",
  "exec.october_budget AS october_budget",
  "exec.november_budget_execution AS november_budget_execution",
  "exec.november_budget AS november_budget",
  "exec.december_budget_execution AS december_budget_execution",
  "exec.december_budget AS december_budget"
];

const CHUNKSIZE = 100;

const FILENAME = "BudgetExecutionDao.js";

class BudgetExecutionDao {
  constructor() {
    this.connection = connectionPool.getConnection();
    this.nestHydrationJS = new NestHydrationJS();
  }

  static getQuarter1Query() {
    return quarter1;
  }

  static getQuarter2Query() {
    return quarter2;
  }

  static getQuarter3Query() {
    return quarter3;
  }

  static getQuarter4Query() {
    return quarter4;
  }

  getAllBudgetExecutionsTrx(
    buildingName = String,
    date = {
      year: (year = Number),
      quarter: (quarter = Number)
    },
    quarterQuery = Array,
    trx = this.connection
  ) {
    return trx
      .where({ year: date.year, quarter: date.quarter })
      .select(
        "exec.id AS id",
        "exec.summarized_section_id AS summarized_section_id",
        "ss.section AS section",
        "exec.year AS year",
        "exec.quarter AS quarter",
        ...quarterQuery,
        "exec.evaluation AS evaluation",
        "exec.total_budget AS total_budget",
        "exec.total_execution AS total_execution",
        "exec.difference AS difference",
        "exec.notes AS notes"
      )
      .from(
        buildingName + "_budget_execution_quarter" + date.quarter + " AS exec"
      )
      .innerJoin(
        "summarized_sections AS ss",
        "exec.summarized_section_id",
        "ss.id"
      )
      .orderBy("section")
      .catch((error) => {
        const msg = `המערכת נכשלה בשליפת נתונים של ביצוע מול תקציב לבניין ${buildingNameHeb} רבעון ${quarter} שנה ${year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getBudgetExecutionsByRange(
    buildingInfo,
    date,
    range = {
      pageSize: 100,
      startElement: 0
    },
    quarterQuery = Array,
    trx = this.connection
  ) {
    const { quarter, year } = date;
    const { buildingId, buildingName } = buildingInfo;
    const { pageSize, startElement } = range;

    return trx
      .where({ year, quarter })
      .select(
        "exec.id AS id",
        "exec.summarized_section_id AS summarized_section_id",
        "ss.section AS section",
        "exec.year AS year",
        "exec.quarter AS quarter",
        ...quarterQuery,
        "exec.evaluation AS evaluation",
        "exec.total_budget AS total_budget",
        "exec.total_execution AS total_execution",
        "exec.difference AS difference",
        "exec.notes AS notes"
      )
      .from(buildingId + "_budget_execution_quarter" + quarter + " AS exec")
      .innerJoin(
        "summarized_sections AS ss",
        "exec.summarized_section_id",
        "ss.id"
      )
      .limit(pageSize)
      .offset(startElement)
      .orderBy("section")
      .catch((error) => {
        const msg = `המערכת נכשלה בשליפת נתונים של ביצוע מול תקציב לבניין ${buildingName} רבעון ${quarter} שנה ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  getAllByQuarter(
    buildingInfo,
    date,
    quarterQuery = Array,
    trx = this.connection
  ) {
    const { quarter, year } = date;
    const { buildingName, buildingNameHeb } = buildingInfo;

    return trx
      .where({ year, quarter })
      .select(
        "exec.id AS id",
        "exec.summarized_section_id AS summarized_section_id",
        "ss.section AS section",
        "exec.year AS year",
        "exec.quarter AS quarter",
        ...quarterQuery,
        "exec.evaluation AS evaluation",
        "exec.total_budget AS total_budget",
        "exec.total_execution AS total_execution",
        "exec.difference AS difference",
        "exec.notes AS notes"
      )
      .from(buildingName + "_budget_execution_quarter" + quarter + " AS exec")
      .innerJoin(
        "summarized_sections AS ss",
        "exec.summarized_section_id",
        "ss.id"
      )
      .orderBy("section")
      .catch((error) => {
        const msg = `המערכת נכשלה בשליפת נתונים של ביצוע מול תקציב לבניין ${buildingNameHeb} רבעון ${quarter} שנה ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  getBudgetExecutionTrx(
    buildingId = String,
    date = {
      year: (year = Number),
      quarter: (quarter = String)
    },
    quarterQuery = Array,
    summarized_section_id = Number,
    trx
  ) {
    return trx
      .where({
        year: date.year,
        quarter: date.quarter,
        summarized_section_id: summarized_section_id
      })
      .select(
        "exec.id AS id",
        "exec.summarized_section_id AS summarized_section_id",
        "ss.section AS section",
        "exec.year AS year",
        "exec.quarter AS quarter",
        ...quarterQuery,
        "exec.evaluation AS evaluation",
        "exec.total_budget AS total_budget",
        "exec.total_execution AS total_execution",
        "exec.difference AS difference",
        "exec.notes AS notes"
      )
      .from(
        buildingId + "_budget_execution_quarter" + date.quarter + " AS exec"
      )
      .innerJoin(
        "summarized_sections AS ss",
        "exec.summarized_section_id",
        "ss.id"
      )
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של רשומה בביצוע מול תקציב לבניין ${buildingId} לרבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  getBudgetExecutionById(
    buildingId = String,
    date = {
      year: (year = Number),
      quarter: (quarter = String)
    },
    quarterQuery = Array,
    id = Number,
    trx = this.connection
  ) {
    return trx
      .where("exec.id", id)
      .select(
        "exec.id AS id",
        "exec.summarized_section_id AS summarized_section_id",
        "ss.section AS section",
        "exec.year AS year",
        "exec.quarter AS quarter",
        ...quarterQuery,
        "exec.evaluation AS evaluation",
        "exec.total_budget AS total_budget",
        "exec.total_execution AS total_execution",
        "exec.difference AS difference",
        "exec.notes AS notes"
      )
      .from(
        buildingId + "_budget_execution_quarter" + date.quarter + " AS exec"
      )
      .innerJoin(
        "summarized_sections AS ss",
        "exec.summarized_section_id",
        "ss.id"
      )
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתונים של רשומה בביצוע מול תקציב לבניין ${buildingId} לרבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  updateBudgetExecutionTrx(
    buildingId = String,
    date = {
      year: (year = Number),
      quarter: (quarter = String)
    },
    summarized_section_id = Number,
    budgetExec = Object,
    trx = this.connection
  ) {
    return trx(
      buildingId + "_budget_execution_quarter" + date.quarter + " AS exec"
    )
      .where({ year: date.year, summarized_section_id: summarized_section_id })
      .update(budgetExec)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן את הרשומה בביצוע מול תקציב לבניין ${buildingId} לרבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  deleteBudgetExecutionTrx(
    buildingId = String,
    date = Object,
    id = Number,
    trx
  ) {
    return trx(buildingId + "_budget_execution_quarter" + date.quarter)
      .where({ id: id, year: date.year })
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק את הרשומה בביצוע מול תקציב לבניין ${buildingId} לרבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  addBudgetExecution(buildingId, date, payload, trx = this.connection) {
    const { quarter, year } = date;
    return trx(`${buildingId}_budget_execution_quarter${quarter}`)
      .insert(payload)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לביצוע מול תקציב לבניין ${buildingId} לרבעון ${quarter} שנה ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  batchInsert(buildingId, date, rows, trx) {
    const { quarter, year } = date;

    return trx
      .batchInsert(
        `${buildingId}_budget_execution_quarter${quarter}`,
        rows,
        CHUNKSIZE
      )
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות לביצוע מול תקציב לבניין ${buildingId} לרבעון ${quarter} שנה ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  dataRowCount(buildingId, date) {
    return this.connection(
      `${buildingId}_budget_execution_quarter${date.quarter}`
    )
      .count("id")
      .where({ year: date.year, quarter: date.quarter })
      .then((result) => {
        return result[0]["count(`id`)"];
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף מידע לגבי מספר השורות בביצוע מול תקציב לבניין ${buildingId} לרבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }
}

module.exports = BudgetExecutionDao;
