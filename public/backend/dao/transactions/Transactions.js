const NestHydrationJS = require('nesthydrationjs');
const MonthExpansesLogic = require('../../logic/MonthExpansesLogic');
const BudgetExecutionLogic = require('../../logic/BudgetExecutionLogic');

class TransactionsDao {

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
  async updateMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {

    buildingName = Helper.trimSpaces(buildingName);

    console.log(date);
    console.log(buildingName);
    console.log(expanse);

    this.connection.transaction((trx) => {

      return trx(buildingName + "_month_expanses")
        .where({ id: expanse.id })
        .update(expanse)
        .transacting(trx)
        .then(() => {
          //update the expanse first
          return this.connection.where({ year: date.year, month: date.month, summarized_section_id: expanse.summarized_section_id }).select(
            "building.id AS id",
            "building.expanses_code_id AS expanses_code_id",
            "building.sum AS sum",
            "sc.id AS summarized_section_id",
            "sc.section AS section",
          ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
            .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id").transacting(trx);
        })
        .then((expanses) => {
          return MonthExpansesLogic.calculateExpansesSum(expanses);
        })
        .then((totalSum) => {
          return this.connection.where({ year: date.year, quarter: date.quarter, summarized_section_id: expanse.summarized_section_id })
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
            .transacting(trx)
            .then((budget) => {
              let newData = this.bel.calculateBudget(budget, totalSum, date);
              return trx(buildingName + "_budget_execution_quarter" + date.quarter + " AS exec")
                .where({ year: date.year, summarized_section_id: expanse.summarized_section_id })
                .update(newData)
            })
        })
        .then(trx.commit)
        .catch(function (e) {
          trx.rollback();
          throw e;
        })

    })
      .then((inserts) => {
        console.log("success");
      })
      .catch((error) => {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error("error");
        console.error(error);
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

module.exports = TransactionsDao;