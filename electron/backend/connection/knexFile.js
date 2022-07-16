module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "../data/db/ramot-group-db.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "../../data/migrations"
    },
    seeds: {
      directory: "../../data/seeds"
    }
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: ""
    },
    useNullAsDefault: true,
    migrations: {
      directory: "../../data/migrations"
    },
    seeds: {
      directory: "../../data/seeds"
    }
  }
};
