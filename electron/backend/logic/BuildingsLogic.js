const { asyncForEach, sendToWindow } = require("../../helpers/utils");
const ConnectionPool = require("../connection/ConnectionPool");
const BuildingsDao = require("../dao/BuildingsDao");

class BuildingsLogic {
  constructor() {
    this.buildingsDao = new BuildingsDao();
  }

  /**
   * Get building by id
   * @param {*} id the id of the building
   * @param {*} trx transaction object
   * @returns building
   */
  getBuildingById(id, trx) {
    return this.buildingsDao.getBuildingById(id, trx);
  }

  /**
   * Get building by status
   * @param {*} status the status of building
   * @param {*} trx transaction object
   * @returns building
   */
  getBuildingsByStatus(status, trx) {
    return this.buildingsDao.getBuildingsByStatus(status, trx);
  }

  /**
   * Get all buildings
   * @param {*} trx transaction object
   * @returns all buildings
   */
  getAllBuildings(trx) {
    return this.buildingsDao.getAllBuildings(trx);
  }

  /**
   * add a building
   * @param {*} params buildingName of the building to create
   * @returns
   */
  async addBuilding({ buildingName }) {
    // start transaction
    const trx = await ConnectionPool.getTransaction();

    const { customAlphabet } = require("nanoid");
    const { lowercase } = require("nanoid-dictionary");
    const lowercaseRandomString = customAlphabet(lowercase, 10);

    const buildings = await this.getAllBuildings(trx);

    // tabe prefix will be used to name
    // the tables of the building in the database
    // only letters and numbers limited to 10 characters
    const id = lowercaseRandomString();

    // new building object
    const record = {
      id,
      buildingName,
      color: "rgb(14, 122, 185)",
      status: "פעיל",
      order: buildings.length + 1,
      previousBuildingName: buildingName
    };

    // create path string
    record.path = buildingName.replaceAll(" ", "-");

    await this.buildingsDao.addBuilding(record, trx);

    // create all the tables in the database
    await createMonthExpansesTable(id, trx);
    await createBudgetExecutionTables(id, trx);
    await createSummarizedBudgetTable(id, trx);
    await createRegisteredMonthsTable(id, trx);
    await createRegisteredQuartersTable(id, trx);
    await createRegisteredYearsTable(id, trx);
    await createMonthlyStatsTable(id, trx);
    await createQuarterlyStatsTable(id, trx);
    await createYearlyStatsTable(id, trx);

    const addedBuilding = await this.buildingsDao.getBuildingByBuildingName(
      buildingName,
      trx
    );

    // end transaction
    trx.commit();

    return addedBuilding[0];
  }

  /**
   * update building
   * @param {*} params id and the payload to update
   * @returns the updated building
   */
  async updateBuilding({ id, payload }) {
    // start transaction
    const trx = await ConnectionPool.getTransaction();

    const record = { ...payload };

    const building = await this.getBuildingById(id, trx);

    // for deleted status מחוק added deletion date
    // otherwise init it to null
    if (payload.status === "מחוק" && payload.status !== building.status) {
      const deletionDate = new Date();
      deletionDate.setDate(deletionDate.getDate() + 30);
      record.deletionDate = deletionDate.toDateString();
    } else {
      if (payload.deletionDate !== null) record.deletionDate = null;
    }

    const updatedBuilding = await this.buildingsDao.updateBuilding(
      id,
      record,
      trx
    );

    // end transaction
    trx.commit();

    return updatedBuilding;
  }

  /**
   * if 30 days or more passed since the user changed
   * the status of the buildings to deleted, notify the renderer
   * to delete the buildings
   */
  async deleteBuildingsInQueue() {
    const currentDateTime = new Date().getTime();

    const buildings = await this.getAllBuildings();

    const buildingsForDeletion = [];

    buildings.forEach(({ buildingName, status, deletionDate, id }) => {
      if (status === "מחוק") {
        const deletionDateTime = Date.parse(deletionDate);

        const differenceTime = currentDateTime - deletionDateTime;

        // To calculate the no. of days between two dates
        const differenceDays = differenceTime / (1000 * 3600 * 24);

        if (differenceDays > 30) {
          buildingsForDeletion.push({
            id,
            buildingName
          });
        }
      }
    });

    if (buildingsForDeletion.length > 0)
      sendToWindow("buildings-for-deletion-data", buildingsForDeletion);
  }

  /**
   * remove list of buildings
   * @param {*} buildingsForDeletion list of buildings to delete
   */
  async removeBuildings(buildingsForDeletion) {
    // start transaction
    const trx = await ConnectionPool.getTransaction();

    const RegisteredReportsDao = require("../dao/RegisteredReportsDao");
    const registeredReportsDao = new RegisteredReportsDao();

    // drop all the tables of the specific building
    await asyncForEach(buildingsForDeletion, async ({ id }) => {
      await trx.schema.dropTable(`${id}_budget_execution_quarter1`);
      await trx.schema.dropTable(`${id}_budget_execution_quarter2`);
      await trx.schema.dropTable(`${id}_budget_execution_quarter3`);
      await trx.schema.dropTable(`${id}_budget_execution_quarter4`);
      await trx.schema.dropTable(`${id}_month_expanses`);
      await trx.schema.dropTable(`${id}_monthly_stats`);
      await trx.schema.dropTable(`${id}_quarterly_stats`);
      await trx.schema.dropTable(`${id}_registered_months`);
      await trx.schema.dropTable(`${id}_registered_quarters`);
      await trx.schema.dropTable(`${id}_registered_years`);
      await trx.schema.dropTable(`${id}_summarized_budget`);
      await trx.schema.dropTable(`${id}_yearly_stats`);

      await this.buildingsDao.removeBuilding(id, trx);
      await registeredReportsDao.removeReports(id, trx);
    });

    // end transaction
    trx.commit();
  }
}

async function createMonthExpansesTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_month_expanses`, (table) => {
    table.increments("id").primary().notNullable();
    table.integer("expanses_code_id").notNullable();
    table.text("supplierName");
    table.float("sum");
    table.float("tax");
    table.text("notes");
    table.text("month");
    table.integer("year");
  });
}

async function createBudgetExecutionTables(tablePrefix, trx) {
  const Helper = require("../../helpers/Helper");

  // create table for each quarter
  for (let i = 1; i < 5; i++) {
    // months of specific quarter
    const months = Helper.getQuarterMonths(i);

    await trx.schema.createTable(
      `${tablePrefix}_budget_execution_quarter${i}`,
      (table) => {
        table.increments("id").primary().notNullable();
        table.integer("summarized_section_id").notNullable();
        table.integer("year").notNullable();
        table.integer("quarter").notNullable();

        months.forEach((month) => {
          table.float(`${month}_budget`);
          table.float(`${month}_budget_execution`);
        });

        table.float("evaluation");
        table.float("total_budget");
        table.float("total_execution");
        table.float("difference");
        table.text("notes");
      }
    );
  }
}

async function createSummarizedBudgetTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_summarized_budget`, (table) => {
    table.increments("id").primary().notNullable();
    table.integer("summarized_section_id").notNullable();
    table.integer("year").notNullable();

    for (let i = 1; i < 5; i++) {
      table.float(`quarter${i}_budget`);
      table.float(`quarter${i}_execution`);
    }

    table.float("evaluation");
    table.float("year_total_budget");
    table.float("year_total_execution");
    table.text("notes");
  });
}

async function createRegisteredMonthsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_registered_months`, (table) => {
    table.increments("id").primary().notNullable();
    table.integer("year").notNullable();
    table.integer("quarter").notNullable();
    table.text("month").notNullable();
    table.text("monthHeb").notNullable();
    table.integer("monthNum").notNullable();
  });
}

async function createRegisteredQuartersTable(tablePrefix, trx) {
  await trx.schema.createTable(
    `${tablePrefix}_registered_quarters`,
    (table) => {
      table.increments("id").primary().notNullable();
      table.integer("year").notNullable();
      table.integer("quarter").notNullable();
      table.text("quarterHeb").notNullable();
    }
  );
}

async function createRegisteredYearsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_registered_years`, (table) => {
    table.increments("id").primary().notNullable();
    table.integer("year").notNullable();
  });
}

async function createMonthlyStatsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_monthly_stats`, (table) => {
    table.increments("id").primary().notNullable();
    table.integer("year").notNullable();
    table.integer("quarter").notNullable();
    table.text("month").notNullable();
    table.integer("monthNum").notNullable();
    table.float("income").notNullable();
    table.float("outcome").notNullable();
  });
}

async function createQuarterlyStatsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_quarterly_stats`, (table) => {
    table.increments("id").primary().notNullable();
    table.integer("year").notNullable();
    table.integer("quarter").notNullable();
    table.float("income").notNullable();
    table.float("outcome").notNullable();
  });
}

async function createYearlyStatsTable(tablePrefix, trx) {
  await trx.schema.createTable(`${tablePrefix}_yearly_stats`, (table) => {
    table.increments("id").primary().notNullable();
    table.integer("year").notNullable();
    table.float("income").notNullable();
    table.float("outcome").notNullable();
  });
}

module.exports = BuildingsLogic;
