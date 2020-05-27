const { shell, app } = require('electron');
const path = require('path');

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.openLogFile = () => {
  console.log(path.join(app.getAppPath(), "logs", "ramot-mezach-errors.log"));
  shell.showItemInFolder(path.join(app.getAppPath(), "logs", "ramot-mezach-errors.log"));
}