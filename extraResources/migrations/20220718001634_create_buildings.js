exports.up = function (knex) {
  return knex.schema.createTable("buildings", (table) => {
    table.string("id", 50).notNullable().unique();
    table.string("buildingName").notNullable();
    table.string("previousBuildingName").notNullable();
    table.string("color").notNullable();
    table.string("path").notNullable();
    table.integer("order").notNullable();
    table.string("status", 20).notNullable();
    table.string("deletionDate");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("buildings");
};
