exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("general")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("general").insert([{ id: 1, tax: 17 }]);
    });
};
