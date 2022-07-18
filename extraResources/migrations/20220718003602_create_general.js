exports.up = function (knex) {
  return knex.schema.createTable("general", (table) => {
    table.integer("id").notNullable().unique();
    table.integer("tax").defaultTo(17);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("general");
};
