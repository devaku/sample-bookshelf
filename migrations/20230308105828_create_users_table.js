exports.up = function (knex) {
	return knex.schema.createTable('users', function (table) {
        
		table.increments('id').primary();
		table.string('first_name', 255).notNullable();
		table.string('last_name', 255).notNullable();
        knex.raw(`ALTER TABLE users AUTO_INCREMENT = 1`);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users');
};
