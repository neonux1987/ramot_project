const IODao = require('../dao/IODao');

class IOLogic {

  constructor() {
    this.iODao = new IODao()
  }

  writeFile(filePath, data) {
    return this.iODao.writeFile(filePath, data);
  }

  readFile(filePath, settings) {
    return this.iODao.readFile(filePath, settings);
  }

  removeFile(filePath) {
    return this.iODao.removeFile(filePath);
  }

}


module.exports = IOLogic;