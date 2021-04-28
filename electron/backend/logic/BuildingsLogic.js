const ConnectionPool = require('../connection/ConnectionPool');
const BuildingsDao = require('../dao/BuildingsDao');

class BuildingsLogic {

  constructor(connection) {
    this.buildingsDao = new BuildingsDao(connection);
  }

  getBuildings(trx) {
    return this.buildingsDao.getBuidlings(trx);
  }

  addBuilding(buildingName) {
    const { nanoid } = require('nanoid');
    const trx = await ConnectionPool.getTransaction();

    // tabe prefix will be used to name
    // the tables of the building in the database
    const tablePrefix = nanoid();

    const record = {
      buildingName,
      tablePrefix,
      visible: "כן",
      status: "active"
    };

    // add the building
    await this.buildingsDao.addBuilding(buildingName, record, trx);

    // create all the tables
    await createMonthExpansesTable(tablePrefix, trx);
    await createBudgetExecutionTables(tablePrefix, trx);
    await createSummarizedBudgetTable(tablePrefix, trx);
    await createRegisteredMonthsTable(tablePrefix, trx);
    await createRegisteredQuartersTable(tablePrefix, trx);
    await createRegisteredYearsTable(tablePrefix, trx);
    await createMonthlyStatsTable(tablePrefix, trx);
    await createQuarterlyStatsTable(tablePrefix, trx);
    await createYearlyStatsTable(tablePrefix, trx);
  }

  /**
   * the building is not getting deleted immediately 
   * but moved to deleted status
   */
  deleteBuilding(id, buildingName, trx) {
    const record = {
      status: "deleted"
    }

    return this.buildingsDao.updateBuilding(id, buildingName, record, trx);
  }

}

async function createMonthExpansesTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_month_expanses`, table => {

    table.increments('id').primary().notNullable();
    table.integer('expanses_code_id').notNullable();
    table.text('supplierName');
    table.float('sum');
    table.float('tax');
    table.text('notes');
    table.text('month');
    table.integer('year');

  });
}

async function createBudgetExecutionTables(tablePrefix, trx) {
  for (let i = 1; i < 5; i++) {
    // months of specific quarter
    const months = Helper.getQuarterMonths(i);

    await trx.schema.createTable(`${tablePrefix}_budget_execution_quarter${i}`, table => {

      table.increments('id').primary().notNullable();
      table.integer('summarized_section_id').notNullable();
      table.integer('year').notNullable();
      table.integer('quarter').notNullable();

      months.forEach(month => {
        table.float(`${month}_budget`);
        table.float(`${month}_budget_execution`);
      });

      table.float('evaluation');
      table.float('total_budget');
      table.float('total_execution');
      table.float('difference');
      table.text('notes');

    });
  }
}

async function createSummarizedBudgetTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_summarized_budget`, table => {

    table.increments('id').primary().notNullable();
    table.integer('summarized_section_id').notNullable();
    table.integer('year').notNullable();

    for (let i = 1; i < 5; i++) {
      table.float(`quarter${i}_budget`);
      table.float(`quarter${i}_execution`);
    }

    table.float('evaluation');
    table.float('year_total_budget');
    table.float('year_total_execution');
    table.text('notes');

  });

}

async function createRegisteredMonthsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_registered_months`, table => {

    table.increments('id').primary().notNullable();
    table.integer('year').notNullable();
    table.integer('quarter').notNullable();
    table.text('month').notNullable();
    table.text('monthHeb').notNullable();
    table.integer('monthNum').notNullable();

  });
}

async function createRegisteredQuartersTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_registered_quarters`, table => {

    table.increments('id').primary().notNullable();
    table.integer('year').notNullable();
    table.integer('quarter').notNullable();
    table.text('quarterHeb').notNullable();

  });
}

async function createRegisteredYearsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_registered_years`, table => {

    table.increments('id').primary().notNullable();
    table.integer('year').notNullable();

  });
}

async function createRegisteredYearsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_registered_years`, table => {

    table.increments('id').primary().notNullable();
    table.integer('year').notNullable();

  });
}

async function createMonthlyStatsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_monthly_stats`, table => {

    table.increments('id').primary().notNullable();
    table.integer('year').notNullable();
    table.integer('quarter').notNullable();
    table.text('month').notNullable();
    table.integer('monthNum').notNullable();
    table.float('income').notNullable();
    table.float('outcome').notNullable();

  });
}

async function createQuarterlyStatsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_quarterly_stats`, table => {

    table.increments('id').primary().notNullable();
    table.integer('year').notNullable();
    table.integer('quarter').notNullable();
    table.float('income').notNullable();
    table.float('outcome').notNullable();

  });
}

async function createYearlyStatsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_yearly_stats`, table => {

    table.increments('id').primary().notNullable();
    table.integer('year').notNullable();
    table.float('income').notNullable();
    table.float('outcome').notNullable();

  });
}

module.exports = BuildingsLogic;