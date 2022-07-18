exports.up = function (knex) {
  return knex.schema.createTable("summarized_sections", (table) => {
    table.increments("id").notNullable().unique();
    table.string("section");
    table.string("status", 20);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("summarized_sections");
};
