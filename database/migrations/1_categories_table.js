
exports.up = function(knex) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments();
    tbl.string('name', 228).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories');
};
