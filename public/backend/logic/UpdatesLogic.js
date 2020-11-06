const path = require('path');
const fse = require('fs-extra');
const SystemPaths = require('../system/SystemPaths');

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

                const buildingsDao = new BuildingsDao();

                const trx = await connectionPool.getTransaction();

                const buildings = await buildingsDao.getBuidlings(trx);

                await asyncForEach(buildings, async ({ buildingNameEng }) => {

                    await trx.schema.table(`${buildingNameEng}_monthly_stats`, (table) => {
                        //console.log(table.column("month"));
                    });

                });


                //trx.schema.table("")

                //updateConfigFile.runScript = false;
                //await fse.writeJSON(path.join(SystemPaths.paths.setup_folder_path, "updateConfig.json"), updateConfigFile);

                trx.commit();
            }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UpdatesLogic;