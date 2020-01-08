const path = require('path');
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();

const dbPath = platform === "linux" ? path.join(homedir, "Dropbox/ndts/db/ndts-frms-db.sqlite") : `${homedir}\\AppData\\Roaming\\ndts\\db\\ndts-frms-db.sqlite`;

class MainSystem {

  constructor() {
    //create database connection
    this.knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: dbPath,
      },
      useNullAsDefault: true
    });

  }

  getConnection() {
    return this.knex;
  }

}

module.exports = new MainSystem();