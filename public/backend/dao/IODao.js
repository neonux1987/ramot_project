const fs = require('fs');

class IODao {

  readFile(filePath, settings) {
    return fs.readFile(filePath, settings, (err, data) => {
      if (err) throw err;
    });
  }

  saveFile(filePath, data) {
    return fs.writeFile(filePath, data, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }

}


module.exports = IODao;