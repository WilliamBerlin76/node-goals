
exports.up = function(knex) {
  return knex.schema.createTable('step_list', tbl => {
      tbl.increments()
      tbl.integer('step_num')
      tbl.integer('goal_user_cat_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('goal_user_cat')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
       
      tbl.integer('step_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('steps')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('step_list')
};
