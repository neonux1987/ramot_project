const path = require("path");
const fse = require("fs-extra");
const SystemPaths = require("../system/SystemPaths");

class UpdatesLogic {
  /*
    run logic after the user updates the app
  */
  async runUpdateLogic() {
    try {
      const updateConfigPath = path.join(
        SystemPaths.paths.setup_folder_path,
        "updateConfig.json"
      );
      const updateConfigFile = await fse.readJson(updateConfigPath);

      if (updateConfigFile.runScript === true) {
      }

      if (updateConfigFile.runMigrations === true) {
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UpdatesLogic;
