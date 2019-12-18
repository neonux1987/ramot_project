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

const CHUNKSIZE = 100;

class SummarizedBudgetDao {

  constructor(connection) {
    this.connection = connection;
    this.nestHydrationJS = new NestHydrationJS();
  }

  getBuildingSummarizedBudgetTrx(
    buildingName = String,
    date = {
      year: Number
    },
    trx = this.connection
  ) {
    return trx.select(
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
      .from(buildingName + "_summarized_budget AS building").innerJoin("summarized_sections AS sc", "building.summarized_section_id", "sc.id")
      .catch((error) => {
        throw error;
      });
  }

  getSummarizedBudgetsByRange(
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
  ) {
    return trx.select(
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
      .from(buildingName + "_summarized_budget AS building").innerJoin("summarized_sections AS sc", "building.summarized_section_id", "sc.id")
      .limit(pageSettings.pageSize).offset(pageSettings.startElement)
      .catch((error) => {
        throw error;
      });
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
      .from(buildingName + "_summarized_budget AS building").innerJoin("summarized_sections AS sc", "building.summarized_section_id", "sc.id");

    return data.then((result) => {
      return result;
    }).catch((error) => {
      throw error;
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
          throw new Error(`${summarized_section_id} לא קיימת רשומה עם מספר זיהוי`);
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  batchInsert(
    buildingName,
    rows,
    trx
  ) {
    return trx.batchInsert(`${buildingName}_summarized_budget`, rows, CHUNKSIZE)
      .catch((error) => {
        throw error;
      });
  }

  dataRowCount(
    buildingName,
    date
  ) {
    return this.connection(`${buildingName}_summarized_budget`)
      .count('id')
      .where({ year: date.year })
      .then((result) => {
        return result[0]['count(`id`)'];
      })
  }

}

module.exports = SummarizedBudgetDao;