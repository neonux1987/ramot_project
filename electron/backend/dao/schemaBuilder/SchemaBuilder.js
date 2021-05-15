const BuildingsDao = require('../BuildingsDao');
const connectionPool = require('../../connection/ConnectionPool');
const { asyncForEach } = require('../../../helpers/utils');

class SchemaBuilder {

  constructor() {
    this.buildingsDao = new BuildingsDao();
  }

  async modifyTableSchema() {

    const connection = connectionPool.getConnection("test");

    const buildings = await this.buildingsDao.getBuidlings();

    // creates the quarter column in registered months
    // for each building in the database
    await asyncForEach(buildings, async building => {

      const tableName = `${building.buildingId}_registered_months`;
      const columnName = 'quarter';

      const hasColumn = await connection.schema.hasColumn(tableName, columnName);

      if (!hasColumn)
        await connection.schema.table(tableName, function (table) {
          table.integer(columnName);
        });

    })

  }


}

module.exports = SchemaBuilder;