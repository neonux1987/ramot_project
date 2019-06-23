const path = require('path');
const homedir = require('os').homedir();
const dbPath = path.join(homedir, "Dropbox/db/ndts-frms-db.sqlite")
console.log(dbPath)

const createDBConnection = () => {
  //create database connection
  let knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
  });
  return knex;
}

module.exports = createDBConnection;