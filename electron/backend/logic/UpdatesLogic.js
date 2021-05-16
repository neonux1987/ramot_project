const path = require('path');
const fse = require('fs-extra');
const SystemPaths = require('../system/SystemPaths');
const Helper = require('../../helpers/Helper');

class UpdatesLogic {

  /*
    run logic after the user updates the app
  */
  async runUpdateLogic() {

    try {

      const updateConfigPath = path.join(SystemPaths.paths.setup_folder_path, "updateConfig.json");
      const updateConfigFile = await fse.readJson(updateConfigPath);

      if (updateConfigFile.runScript === true) {

        // REQUIRES
        const { asyncForEach } = require('../../helpers/utils');
        const connectionPool = require('../connection/ConnectionPool');
        const BuildingsDao = require('../dao/BuildingsDao');
        const MonthlyStatsDao = require('../dao/MonthlyStatsDao');

        const buildingsDao = new BuildingsDao();
        const monthlyStatsDao = new MonthlyStatsDao();

        const trx = await connectionPool.getTransaction();

        const buildings = await buildingsDao.getAllBuildings(trx);

        await asyncForEach(buildings, async ({ buildingId }) => {

          const tableName = `${buildingId}_monthly_stats`;

          await trx.schema.table(tableName, async (table) => {

            const hasColumn = await trx.schema.hasColumn(tableName, "monthNum");

            if (hasColumn) {

              //table.integer("monthNum")

              const stats = await monthlyStatsDao.getAllBuildingStats(buildingId, trx);

              await asyncForEach(stats, async (row) => {

                const monthNum = Helper.hebToMonthNum(row.month);

                const date = {
                  year: row.year,
                  monthHeb: row.month
                }

                const data = { monthNum }

                //await monthlyStatsDao.updateMonthStatsTrx(buildingId, date, data, trx);

              });

            }

            else
              console.log("it has the column");

          });

        });


        //trx.schema.table("")

        //updateConfigFile.runScript = false;
        //await fse.writeJSON(path.join(SystemPaths.paths.setup_folder_path, "updateConfig.json"), updateConfigFile);

        await trx.commit();
      }
    } catch (error) {
      await trx.rollback();
      console.log(error);
    }
  }

}

module.exports = UpdatesLogic;