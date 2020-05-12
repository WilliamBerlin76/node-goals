
exports.up = function(knex) {
    knex.schema.createTable('steps', tbl => {
        tbl.increments()
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('steps')
};
