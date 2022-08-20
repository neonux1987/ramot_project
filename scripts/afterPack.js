const path = require("path");
const fse = require("fs-extra");

function execute() {
  const setupConfigPath = path.join(
    __dirname,
    "../extraResources",
    "setupConfig.json"
  );

  const setupConfigFile = fse.readJsonSync(setupConfigPath);

  setupConfigFile.firstTime = false;

  fse.writeJSONSync(setupConfigPath, setupConfigFile);
}

execute();
