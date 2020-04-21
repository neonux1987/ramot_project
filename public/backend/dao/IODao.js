const fs = require('fs').promises;



class IODao {

  readFile(filePath, settings) {
    return fs.readFile(filePath, settings).catch((error) => {
      //throw new Error("קרתה תקלה, לא ניתן לקרוא את הקובץ.");
      console.log(error);
    });
  }

  writeFile(filePath, data) {
    return fs.writeFile(filePath, data).catch((error) => {
      //throw new Error("כתיבת הקובץ לא הצליחה.");
      console.log(error);
    });
  }

  removeFile(filePath) {
    return fs.unlink(filePath).catch((error) => {
      //throw new Error("מחיקת הקובץ לא הצליחה.");
      console.log(error);
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