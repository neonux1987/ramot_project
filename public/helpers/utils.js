const { shell, app } = require('electron');
const path = require('path');
const ConfigurationLogic = require('../backend/logic/ConfigurationLogic');

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.openLogFile = () => {
  shell.showItemInFolder(ConfigurationLogic.paths.log_file);
}