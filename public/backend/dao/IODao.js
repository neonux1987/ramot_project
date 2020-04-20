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

  createDir(dir) {
    return fs.mkdir(dir).catch((error) => {
      console.log(error);
    });
  }

  dirExist(dir) {
    return fs.access(dir)
      .then(() => true)
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

}


module.exports = IODao;