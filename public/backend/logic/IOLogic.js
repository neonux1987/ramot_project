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

  dirExist(dir) {
    return this.iODao.dirExist(dir);
  }

  async createDir(dir) {
    const exist = await this.dirExist(dir);
    if (!exist) {
      return this.iODao.createDir(dir);
    }
    return Promise.resolve();
  }

  dirExist(dir) {
    return this.iODao.dirExist(dir);
  }

}


module.exports = IOLogic;