const path = require("path");
const fse = require("fs-extra");

const appDir = path.join(__dirname, "../");
const resourcesFolderPath = path.join(appDir, "extraResources");
const setupConfigPath = path.join(resourcesFolderPath, "setupConfig.json");

function execute() {
  const setupConfigFile = fse.readJsonSync(setupConfigPath);

  setupConfigFile.firstTime = false;

  fse.writeJSONSync(setupConfigPath, setupConfigFile);
}

execute();
