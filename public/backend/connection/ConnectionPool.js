class ConnectionPool {

  init(dbFilePath) {

    //create database connection
    this.knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: dbFilePath,
      },
      useNullAsDefault: true
    });
  }

  static getConnection() {
    return this.knex;
  }

}

module.exports = ConnectionPool;