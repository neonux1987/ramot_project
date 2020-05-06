const ConfigurationLogic = require('../logic/ConfigurationLogic');

class ConnectionPool {

  createConnection() {
    throw new Error("wtf")
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