const path = require('path');
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();
const sqlite3 = require('sqlite3');
const simpleNodeLogger = require('simple-node-logger');

const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const computerFolder = platform === "linux" ? path.join(homedir, "Dropbox") : `${homedir}\\AppData\\Roaming`;

const dbPath = platform === "linux" ? path.join(computerFolder, "/mezach/db/") : `${computerFolder}\\mezach\\db\\`;

const systemFolderPath = platform === "linux" ? path.join(computerFolder, "/mezach/") : `${computerFolder}\\mezach\\`;

const DB_NAME = "mezach-db.sqlite";

class MainSystem {

  constructor() {

    //create database connection
    this.knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: dbPath + DB_NAME,
      },
      useNullAsDefault: true
    });

  }

  async firstTimeSetup({ dbFilePath, reportsPath }) {

    if (!fs.existsSync(systemFolderPath)) {
      fs.mkdirSync(systemFolderPath);
      fs.mkdirSync(systemFolderPath + "db");
      fs.mkdirSync(systemFolderPath + "config");
      fs.mkdirSync(systemFolderPath + "backup");
    }

    // create a stdout and file logger
    this.log = simpleNodeLogger.createSimpleLogger(systemFolderPath + 'project.log');

    // if the user passed a location to a previous exisitng database,
    // copy the user's database to the location of the app database
    if (dbFilePath) {
      const dbFile = await readFilePromise(dbFilePath);
      await writeFilePromise(`${dbPath}bdika.sqlite`, dbFile)
    }
    // create an empty database if the use did not
    // specify his own exisiting database
    else {
      this.db = new sqlite3.Database(`${dbPath}/mezach-db-test.sqlite`, (err) => {
        if (err) {
          console.log('Could not connect to database', err)
        } else {
          console.log('Connected to database')
        }
      })
    }



  }

  connectToDatabase() {
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