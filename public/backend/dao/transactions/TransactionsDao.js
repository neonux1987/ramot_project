const NestHydrationJS = require('nesthydrationjs');

class TransactionsDao {

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
    }).catch((error) => {
      throw new Error("קרתה תקלה בשליפת הנתונים של מעקב הוצאות חודשיות.");
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
      throw new Error("קרתה תקלה בשליפת הנתונים של הוצאות חודשיות.");
    });
  }

  /**
   * update month expanse record
   * @param {*} id the id of the month expanse to update
   * @param {*} buildingName the name of the building
   * @param {*} expanseToSave the record to update with
   */
  updateMonthExpanse({ id = Number, buildingName = String, expanseToSave = Object }) {

    knex.transaction(trx => {
      return this.connection(buildingName + "_month_expanses")
        .where({ id: id })
        .update(expanseToSave)
        .then(() => {
          return this.connection.where({ year: year, month: month, summarized_section_id: expanse.summarized_section_id }).select(
            "building.id AS id",
            "building.expanses_code_id AS expanses_code_id",
            "building.sum AS sum",
            "sc.id AS summarized_section_id",
            "sc.section AS section",
          ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
            .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id");
        })
        .then((result) => {
          const totalSum = MonthExpansesLogic.calculateExpansesSum(result);

        })
        .then(trx.commit)
        .catch(e => {
          trx.rollback();
          throw e;
        })
    })
      .then(() => {
        // it worked
      })
      .catch(e => {
        // it failed
      });




    let data = this.connection(buildingName + "_month_expanses")
      .where({ id: id })
      .update(expanseToSave);

    return data.then((result) => result)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון עידכון הוצאה.");
      })
  }

  addNewMonthExpanse(buildingName = String, record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון להוסיף הוצאה חדשה.");
      });;
  }

}

module.exports = TransactionsDao;