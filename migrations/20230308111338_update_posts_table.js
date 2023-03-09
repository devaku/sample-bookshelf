exports.up = function (knex) {
	return knex.schema.table('posts', (table) => {
		table.integer('user_id');
	});
};

exports.down = function (knex) {
	return knex.schema.table('posts', (table) => {
		table.dropColumn('user_id');
	});
};
