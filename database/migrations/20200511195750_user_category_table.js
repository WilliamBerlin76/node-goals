
exports.up = function(knex) {
    knex.schema.createTable('user_category', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl.integer('category_id')
            .unsigned()
            .references('id')
            .inTable('categories')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('user_category')
};
