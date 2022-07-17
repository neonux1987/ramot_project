const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(
        __dirname,
        "../../../database",
        "ramot-group-db.sqlite"
      )
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "../../../extraResources/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "../../../extraResources/seeds")
    }
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: process.env.RAMOT_DB_FILE_PATH
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "../../../extraResources/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "../../../extraResources/seeds")
    }
  }
};
