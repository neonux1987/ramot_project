const FileType = require('file-type');
const fse = require('fs-extra');
const LogicError = require('../customErrors/LogicError');

const EXT = "sqlite";

class RestoreDbLogic {

  constructor() {

  }

  async restoreFromFile(path) {
    const fileType = await FileType.fromFile(path);
    if (fileType === undefined || fileType.ext !== EXT)
      throw new LogicError(`הקובץ שבחרת הוא לא קובץ בסיס נתונים מסוג ${EXT}`);

    //const sqlite3File = fse.readFile(path);

  }

}

module.exports = RestoreDbLogic;