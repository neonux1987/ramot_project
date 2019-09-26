const fs = require('fs');

class IODao {

  saveFile(filePath) {
    fs.writeFile(filePath, "hello", function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }

}


module.exports = IODao;