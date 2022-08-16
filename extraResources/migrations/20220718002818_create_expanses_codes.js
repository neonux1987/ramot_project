exports.up = function (knex) {
  return knex.schema.createTable("expanses_codes", (table) => {
    table.increments("id").notNullable().unique();
    table.integer("summarized_section_id").notNullable();
    table.integer("code").notNullable().unique();
    table.string("codeName").notNullable();
    table.integer("with_vat").defaultTo(0).notNullable();
    table.string("status", 20).notNullable().defaultTo("active");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("expanses_codes");
};
