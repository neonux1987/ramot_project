const ConfigurationLogic = require('../logic/ConfigurationLogic');
const knex = require('knex');

class ConnectionPool {

  async createConnection() {
    return new Promise((resolve, reject) => {
      //create database connection
      this.knex = knex({
        client: 'sqlite3',
        connection: {
          filename: ConfigurationLogic.paths.db_file_path,
        },
        useNullAsDefault: true
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