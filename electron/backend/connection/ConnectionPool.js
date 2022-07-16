const knex = require("knex");
const DbError = require("../customErrors/DbError");
const knexFile = require("./knexFile");
const { app } = require("electron");
const logManager = require("../logger/LogManager");
const SystemPaths = require("../system/SystemPaths");

const isDev = !app.isPackaged;

const FILENAME = "ConnectionPool.js";

class ConnectionPool {
  async createConnection() {
    return new Promise((resolve, reject) => {
      const logger = logManager.getLogger();

      const config = knexFile[process.env.NODE_ENV];

      // set logger
      config.log = {
        warn: logger.warn,
        error: logger.error,
        deprecate: logger.warn,
        debug: logger.debug
      };

      if (!isDev) config.connection.filename = SystemPaths.paths.db_file_path;

      //create database connection
      this.knex = knex(knexFile[process.env.NODE_ENV]);

      // in order to test knex to see if the connection was successful
      // we must query, and if te query will return error then connection was unsuccessful
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
