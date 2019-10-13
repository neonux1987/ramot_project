const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const removeFilePromise = util.promisify(fs.unlink);

class IODao {

  readFile(filePath, settings) {
    return readFilePromise(filePath, settings).catch(() => {
      throw new Error("קרתה תקלה, לא ניתן לקרוא את הקובץ.");
    });;
  }

  writeFile(filePath, data) {
    return writeFilePromise(filePath, data).catch(() => {
      throw new Error("כתיבת הקובץ לא הצליחה.");
    });
  }

  removeFile(filePath) {
    return removeFilePromise(filePath).catch(() => {
      throw new Error("מחיקת הקובץ לא הצליחה.");
    });
  }

}


module.exports = IODao;