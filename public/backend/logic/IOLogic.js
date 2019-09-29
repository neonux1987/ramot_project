const IODao = require('../dao/IODao');

class IOLogic {

  constructor() {
    this.iODao = new IODao()
  }

  saveFile(filePath, data) {
    this.iODao.saveFile(filePath, data);
  }

  readFile(filePath, settings) {
    this.iODao.readFile(filePath);
  }

}


module.exports = IOLogic;