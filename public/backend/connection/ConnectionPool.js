class ConnectionPool {

  createConnection(dbFilePath) {
    //create database connection
    this.knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: dbFilePath,
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