const { faker } = require('@faker-js/faker');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(() => knex.raw(`ALTER TABLE users AUTO_INCREMENT = 1`))
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{
					first_name: faker.name.firstName(),
					last_name: faker.name.lastName(),
				},
				{
					first_name: faker.name.firstName(),
					last_name: faker.name.lastName(),
				},
				{
					first_name: faker.name.firstName(),
					last_name: faker.name.lastName(),
				},
			]);
		});
};
