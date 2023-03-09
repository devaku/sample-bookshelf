exports.up = function (knex) {
	knex.schema.createTable('posts', function (table) {
		table.increments('id').primary();
		table.string('title', 1000).notNullable();
		table.string('content', 1000);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('posts');
};
