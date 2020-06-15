const { shell, app } = require('electron');
const path = require('path');
const SystemPaths = require('../backend/system/SystemPaths');

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.openLogFile = () => {
  shell.showItemInFolder(SystemPaths.paths.log_file_path);
}