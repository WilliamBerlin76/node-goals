
exports.up = function(knex) {

  return knex.schema.createTable('goal_user_cat', tbl => {
      tbl.increments();
      tbl.integer('user_cat_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user_category')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl.integer('goal_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('goals')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')  
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('goal_user_cat')
};
