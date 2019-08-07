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
]

const quarter3 = [
  "exec.july_budget_execution AS july_budget_execution",
  "exec.july_budget AS july_budget",
  "exec.august_budget_execution AS august_budget_execution",
  "exec.august_budget AS august_budget",
  "exec.september_budget_execution AS september_budget_execution",
  "exec.september_budget AS september_budget"
]

const quarter4 = [
  "exec.october_budget_execution AS october_budget_execution",
  "exec.october_budget AS october_budget",
  "exec.november_budget_execution AS november_budget_execution",
  "exec.november_budget AS november_budget",
  "exec.december_budget_execution AS december_budget_execution",
  "exec.december_budget AS december_budget"
]


class BudgetExecutionDao {

  constructor(connection) {
    this.connection = connection;
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

  /**
   * get building budget execution data
   * params object {
   * year,
   * quarter,
   * buildingName,
   * quarterQuery - different months query
   * }
   */
  getAllBudgetExecutions({
    buildingName = String,
    date = {
      year: year = Number,
      quarter: quarter = String
    },
    quarterQuery = Array
  }) {
    let data = this.connection
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
      ).from(buildingName + "_budget_execution_quarter" + date.quarter + " AS exec").innerJoin("summarized_sections AS ss", "exec.summarized_section_id", "ss.id");

    return data.then((result) => {
      return result;
    }).catch((error) => {
      throw error;
    });
  }

  /**
   * get single building budget execution data with transaction object
   * params object {
   * year,
   * quarter,
   * buildingName,
   * summarized_section_id,
   * quarterQuery - different months query
   * }
   */
  getBudgetExecution(
    buildingName = String,
    date = {
      year: year = Number,
      quarter: quarter = String
    },
    quarterQuery = Array,
    summarized_section_id = Number,
    trx
  ) {
    return trx.where({ year: date.year, quarter: date.quarter, summarized_section_id: summarized_section_id })
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
      ).from(buildingName + "_budget_execution_quarter" + date.quarter + " AS exec").innerJoin("summarized_sections AS ss", "exec.summarized_section_id", "ss.id")
      .catch((error) => {
        throw error;
      });
  }

  /**
   * update budget execution record with transaction object
   * params object {
   * year,
   * buildingName,
   * summarized_section_id,
   * budgetExecutionData
   * }
   */
  updateBudgetExecutionTrx(
    buildingName = String,
    date = {
      year: year = Number,
      quarter: quarter = String
    },
    summarized_section_id = Number,
    budgetExec = Object,
    trx
  ) {
    return trx(buildingName + "_budget_execution_quarter" + date.quarter + " AS exec")
      .where({ year: date.year, summarized_section_id: summarized_section_id })
      .update(budgetExec)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = BudgetExecutionDao;