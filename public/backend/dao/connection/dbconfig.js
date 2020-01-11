const path = require('path');
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();

const dbPath = platform === "linux" ? path.join(homedir, "Dropbox/ndts/db/mezach-db.sqlite") : `${homedir}\\AppData\\Roaming\\ndts\\db\\mezach-db.sqlite`;

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