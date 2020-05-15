const ConfigurationLogic = require('../logic/ConfigurationLogic');

class ConnectionPool {

  createConnection() {
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

  destroy() {
    this.knex.destroy();
  }

}

module.exports = new ConnectionPool();