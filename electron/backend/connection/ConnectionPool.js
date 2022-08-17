const knex = require("knex");
const DbError = require("../customErrors/DbError");
const knexFile = require("./knexFile");
const logManager = require("../logger/LogManager");
const fse = require("fs-extra");

const FILENAME = "ConnectionPool.js";

class ConnectionPool {
  constructor() {
    this.config = knexFile[process.env.NODE_ENV];
  }

  async init() {
    const logger = logManager.getLogger();

    // set logger
    this.config.log = {
      warn: logger.warn,
      error: logger.error,
      deprecate: logger.warn,
      debug: logger.debug
    };

    //create database connection
    this.knex = knex(knexFile[process.env.NODE_ENV]);
  }

  async createConnection() {
    return new Promise(async (resolve, reject) => {
      if (!(await this.dbFileExists())) {
        const newError = new DbError("קובץ בסיס נתונים לא קיים", FILENAME);
        reject(newError);
        return;
      }

      // in order to test knex to see if the connection was successful
      // we must query, and if the query will return error then connection was unsuccessful
      this.knex("buildings")
        .count()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          const msg = "המערכת נכשלה בהתחברות לבסיס הנתונים";
          const newError = new DbError(msg, FILENAME, error);
          reject(newError);
        });
    });
  }

  // used for first time setup
  async createDbIfNoneExist() {
    if (await this.dbFileExists()) return;

    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database(this.config.connection.filename);
    db.close();

    // run latest migrations
    await this.knex.migrate.latest();
    await this.knex.seed.run();
  }

  async dbFileExists() {
    return await fse.pathExists(this.config.connection.filename);
  }

  getConnection() {
    return this.knex;
  }

  getTransaction() {
    return this.knex.transaction();
  }

  destroy() {
    return this.knex.destroy(() => {
      this.knex = undefined;
    });
  }
}

module.exports = new ConnectionPool();
