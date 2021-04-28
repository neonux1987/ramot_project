const SystemPaths = require('../system/SystemPaths');
const knex = require('knex');
const logManager = require('../logger/LogManager');
const DbError = require('../customErrors/DbError');

const FILENAME = "ConnectionPool.js";

class ConnectionPool {

  async createConnection() {
    return new Promise((resolve, reject) => {
      const logger = logManager.getLogger();

      //create database connection
      this.knex = knex({
        client: 'sqlite3',
        connection: {
          filename: SystemPaths.paths.db_file_path,
        },
        useNullAsDefault: true,
        log: {
          warn: logger.warn,
          error: logger.error,
          deprecate: logger.warn,
          debug: logger.debug,
        }
      });

      // in order to test knex to see if the connection was successful
      // we must query, and if te query will retrn error then connection was unsuccessful
      this.knex('buildings').count()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          const msg = `המערכת נכשלה בהתחברות לבסיס נתונים.`;
          const newError = new DbError(msg, FILENAME, error);
          reject(newError);
        })

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