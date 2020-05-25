const ConfigurationLogic = require('../logic/ConfigurationLogic');
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

      // in order to test knex to see if the connection was successful
      // we must query, and if te query will retrn error then connection was unsuccessful
      this.knex('buildings').count()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          const msg = `המערכת נכשלה בהתחברות לבסיס נתונים מכיוון שהקובץ אינו קובץ בסיס נתונים מסוג sqlite
          או שקובץ בסיס הנתונים הוחלף בקובץ אחר שהוא לא בסיס נתונים מסוג sqlite או שהקובץ נפגם`;
          const newError = new DbError(msg, FILENAME, error);
          //logger.error(newError.toString())

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