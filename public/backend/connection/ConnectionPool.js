const ConfigurationLogic = require('../logic/ConfigurationLogic');
const knex = require('knex');
const logManager = require('../logger/LogManager');

class ConnectionPool {

  async createConnection() {
    return new Promise((resolve, reject) => {
      const logger = logManager.getLogger();

      //create database connection
      this.knex = knex({
        client: 'sqlite3',
        connection: {
          filename: ConfigurationLogic.paths.db_file_path,
        },
        useNullAsDefault: true,
        log: {
          warn: logger.warn,
          error: logger.error,
          deprecate: logger.warn,
          debug: logger.debug,
        }
      });

      if (this.knex === undefined)
        reject("Failed to create a connection to the database")

      resolve();
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