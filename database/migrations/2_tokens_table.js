
exports.up = function(knex) {
    return knex.schema.createTable('tokens', tbl => {
        tbl.increments();
        tbl.string('token', 5000).notNullable();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tokens')
};
