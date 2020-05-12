
exports.up = function(knex) {
  knex.schema.createTable('goals', tbl => {
      tbl.increments()
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('goals')
};
