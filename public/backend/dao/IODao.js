const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

class IODao {

  readFile(filePath, settings) {
    return readFilePromise(filePath, settings);
  }

  writeFile(filePath, data) {
    return writeFilePromise(filePath, data);
  }

}


module.exports = IODao;