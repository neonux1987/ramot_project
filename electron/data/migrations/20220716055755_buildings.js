exports.up = function (knex) {
  return knex.schema.createTable("buildings", (table) => {
    table.text("id", 50).notNullabe().unique();
    table.text("buildingName", 255).notNullabe();
    table.text("previousBuildingName", 255).notNullabe();
    table.text("color", 255).notNullabe();
    table.text("path").notNullabe();
    table.integer("order").notNullabe();
    table.text("status", 20).notNullabe();
    table.text("deletionDate", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExist("buildings");
};
