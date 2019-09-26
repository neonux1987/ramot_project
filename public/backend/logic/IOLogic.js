const IODao = require('../dao/IODao');

class IOLogic {

  constructor() {
    this.iODao = new IODao()
  }

  saveFile(filePath) {
    this.iODao.saveFile(filePath);
  }

}


module.exports = IOLogic;