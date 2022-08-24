const path = require("path");
const fse = require("fs-extra");

const appDir = path.join(__dirname, "../");
const resourcesFolderPath = path.join(appDir, "extraResources");
const installerNshPath = path.join(resourcesFolderPath, "uninstaller.nsh");
const buildFolderPath = path.join(appDir, "build");
const setupConfigPath = path.join(resourcesFolderPath, "setupConfig.json");

function execute() {
  // ensures th build folder exist for the
  // copy operation of installer.nsh
  fse.ensureDirSync(buildFolderPath);

  // copy install.nsh to build folder for custom
  // installer script
  fse.copyFileSync(
    installerNshPath,
    path.join(buildFolderPath, "uninstaller.nsh")
  );

  const setupConfigFile = fse.readJsonSync(setupConfigPath);

  setupConfigFile.firstTime = true;

  fse.writeJSONSync(setupConfigPath, setupConfigFile);
}

execute();
