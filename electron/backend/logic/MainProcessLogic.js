const { app } = require('electron');

class MainProcessLogic {

  restart() {
    app.relaunch();
    app.exit(0);
  }

  quit() {
    app.quit(0);
  }

}

module.exports = MainProcessLogic;