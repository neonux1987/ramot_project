const NestHydrationJS = require('nesthydrationjs');
const MonthExpansesLogic = require('../../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../../logic/BudgetExecutionLogic');
const Helper = require('../../../helpers/Helper');

const BUDGET_EXEC_DEFINITION = [{
  id: { column: 'id', type: 'NUMBER' },
  summarized_section_id: { column: 'summarized_section_id', type: 'NUMBER' },
  section: 'section',
  year: { column: 'year', type: 'INTEGER' },
  quarter: { column: 'quarter', type: 'INTEGER' },
  april_budget_execution: { column: 'april_budget_execution', type: 'INTEGER' },
  april_budget: { column: 'april_budget', type: 'INTEGER' },
  may_budget_execution: { column: 'may_budget_execution', type: 'INTEGER' },
  may_budget: { column: 'may_budget', type: 'INTEGER' },
  june_budget_execution: { column: 'june_budget_execution', type: 'INTEGER' },
  june_budget: { column: 'june_budget', type: 'INTEGER' },
  evaluation: { column: 'evaluation', type: 'INTEGER' },
  total_budget: { column: 'total_budget', type: 'INTEGER' },
  total_execution: { column: 'total_execution', type: 'INTEGER' },
  difference: { column: 'difference', type: 'INTEGER' },
  notes: 'notes',
}];

const MONTH_EXPANSE_DEFINITION = [{
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

class Transactions {

  constructor(connection) {
    this.connection = connection;
    this.nestHydrationJS = new NestHydrationJS();
  }

  /**
   * update month expanse record
   * @param {*} id the id of the month expanse to update
   * @param {*} buildingName the name of the building
   * @param {*} expanseToSave the record to update with
   */
  updateMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {

    buildingName = Helper.trimSpaces(buildingName);

    return this.connection.transaction((trx) => {
      return trx(buildingName + "_month_expanses")
        .where({ id: expanse.id })
        .update(MonthExpansesLogic.prepareExpanseObj(expanse))
        .then(() => {
          //update the expanse first
          return trx.where({ year: date.year, month: date.month, summarized_section_id: expanse.summarized_section_id }).select(
            "building.id AS id",
            "building.expanses_code_id AS expanses_code_id",
            "building.sum AS sum",
            "sc.id AS summarized_section_id",
            "sc.section AS section",
          ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
            .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id");
        })
        .then((expanses) => {
          const totalSum = MonthExpansesLogic.calculateExpansesSum(expanses);
          return trx.where({ year: date.year, quarter: date.quarter, summarized_section_id: expanse.summarized_section_id })
            .select(
              "exec.id AS id",
              "exec.summarized_section_id AS summarized_section_id",
              "ss.section AS section",
              "exec.year AS year",
              "exec.quarter AS quarter",
              ...BudgetExecutionLogic.getQuarterQuery(date.quarter),
              "exec.evaluation AS evaluation",
              "exec.total_budget AS total_budget",
              "exec.total_execution AS total_execution",
              "exec.difference AS difference",
              "exec.notes AS notes"
            ).from(buildingName + "_budget_execution_quarter" + date.quarter + " AS exec").innerJoin("summarized_sections AS ss", "exec.summarized_section_id", "ss.id")
            .then((budgets) => {
              budgets = this.nestHydrationJS.nest(budgets, BUDGET_EXEC_DEFINITION);
              let newData = BudgetExecutionLogic.calculateBudget(budgets[0], totalSum, date);
              return trx(buildingName + "_budget_execution_quarter" + date.quarter + " AS exec")
                .where({ year: date.year, summarized_section_id: expanse.summarized_section_id })
                .update(newData)
            })
        }).then(() => {

        });

    })
      .catch((error) => {
        throw new Error("קרתה תקלה, שמירת ההוצאה עברה ללא הצלחה. השינויים ל נשמרו.")
      });





    /*     // Using trx as a transaction object:
        const trx = await knex.transaction();
    
        trx(buildingName + "_month_expanses")
          .where({ id: id })
          .update(expanse)
          .then(() => {
            //update the expanse first
            return trx.where({ year: date.year, month: date.month, summarized_section_id: expanse.summarized_section_id }).select(
              "building.id AS id",
              "building.expanses_code_id AS expanses_code_id",
              "building.sum AS sum",
              "sc.id AS summarized_section_id",
              "sc.section AS section",
            ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
              .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id");
          })
          .then((expanses) => {
            return MonthExpansesLogic.calculateExpansesSum(expanses);
          })
          .then((totalSum) => {
            trx.where({ year: date.year, quarter: date.quarter, summarized_section_id: expanse.summarized_section_id })
              .select(
                "exec.id AS id",
                "exec.summarized_section_id AS summarized_section_id",
                "ss.section AS section",
                "exec.year AS year",
                "exec.quarter AS quarter",
                ...BudgetExecutionLogic.getQuarterQuery(date.quarter),
                "exec.evaluation AS evaluation",
                "exec.total_budget AS total_budget",
                "exec.total_execution AS total_execution",
                "exec.difference AS difference",
                "exec.notes AS notes"
              ).from(buildingName + "_budget_execution_quarter" + date.quarter + " AS exec").innerJoin("summarized_sections AS ss", "exec.summarized_section_id", "ss.id");
          })
          .then(trx.commit)
          .catch((error) => {
            trx.rollback();
            throw new Error(error);
          }); */

  }




  addNewMonthExpanse(buildingName = String, record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון להוסיף הוצאה חדשה.");
      });;
  }

}

module.exports = Transactions;