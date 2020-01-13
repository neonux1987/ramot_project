const fs = require('fs').promises;

class IODao {

  readFile(filePath, settings) {
    return fs.readFile(filePath, settings).catch(() => {
      throw new Error("קרתה תקלה, לא ניתן לקרוא את הקובץ.");
    });
  }

  writeFile(filePath, data) {
    return fs.writeFile(filePath, data).catch(() => {
      throw new Error("כתיבת הקובץ לא הצליחה.");
    });
  }

  removeFile(filePath) {
    return fs.unlink(filePath).catch(() => {
      throw new Error("מחיקת הקובץ לא הצליחה.");
    });
  }

}


module.exports = IODao;