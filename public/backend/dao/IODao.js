const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const removeFilePromise = util.promisify(fs.unlink);

class IODao {

  readFile(filePath, settings) {
    return readFilePromise(filePath, settings);
  }

  writeFile(filePath, data) {
    return writeFilePromise(filePath, data);
  }

  removeFile(filePath) {
    return removeFilePromise(filePath);
  }

}


module.exports = IODao;