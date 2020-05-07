const ConfigurationLogic = require('../logic/ConfigurationLogic');
const DbError = require('../modals/DbError');

class ConnectionPool {

  createConnection() {
    throw new DbError(
      "Couldn't create connection to the database",
      "ConnectionPool.js",
      new Error("wtf")
    )
    //create database connection
    this.knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: ConfigurationLogic.paths.db_file_path,
      },
      useNullAsDefault: true
    });
  }

  getConnection() {
    return this.knex;
  }

  getTransaction() {
    return this.knex.transaction();
  }

}

module.exports = new ConnectionPool();