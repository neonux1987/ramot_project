const { app } = require('electron');

class MainProcessLogic {

  restart() {
    new Promise((resolve, reject) => {
      try {
        app.relaunch();
        app.exit(0);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  quit() {
    app.quit(0);
  }

}

module.exports = MainProcessLogic;