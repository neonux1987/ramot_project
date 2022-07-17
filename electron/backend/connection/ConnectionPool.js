const knex = require("knex");
const DbError = require("../customErrors/DbError");
const knexFile = require("./knexFile");
const { app } = require("electron");
const logManager = require("../logger/LogManager");
const SystemPaths = require("../system/SystemPaths");

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
      // in order to test knex to see if the connection was successful
      // we must query, and if the query will return error then connection was unsuccessful
      this.knex("buildings")
        .count()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          const msg = `המערכת נכשלה בהתחברות לבסיס נתונים.`;
          const newError = new DbError(msg, FILENAME, error);
          reject(newError);
        });
    });
  }

  async createDbIfNoneExist() {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database(this.config.connection.filename);
    db.close();

    // run latest migrations
    await this.knex.migrate.latest();
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
