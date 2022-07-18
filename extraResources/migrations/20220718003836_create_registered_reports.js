exports.up = function (knex) {
  return knex.schema.createTable("registered_reports", (table) => {
    table.increments("id").notNullable().unique();
    table.integer("buildingId").notNullable();
    table.integer("month").notNullable();
    table.integer("quarter").notNullable();
    table.integer("year").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("registered_reports");
};
