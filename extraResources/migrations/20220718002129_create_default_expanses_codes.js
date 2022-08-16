exports.up = function (knex) {
  return knex.schema.createTable("default_expanses_codes", (table) => {
    table.increments("id").notNullable().unique();
    table.integer("expanses_code_id").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("default_expanses_codes");
};
