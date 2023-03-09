const express = require('express');

// Load ENVIRONMENT VARIABLES
// Go to the root of the folder
const rootpath = __dirname;
require('dotenv').config({ path: `${rootpath}/.env` });
const app = express();

/**
 * Retrieve ALL entries in the users table
 */
app.get('/', async (req, res) => {
	const { Users } = require('./Models');
	let users = await Users.fetchAll({ require: false });
	if (users) {
		users = users.toJSON();
	}

	res.json(users);
});

/**
 * Retrieve a user in the database with their related posts
 */
app.get('/related', async (req, res) => {
	const { Users } = require('./Models');
	let rows = await Users.where({ id: 1 }).fetch({
		require: false,
		withRelated: ['posts'],
	});
	if (rows) {
		rows = rows.toJSON();
	}
	res.json(rows);
});

/**
 * Find a specific user
 */
app.get('/find', async (req, res) => {
	const { Users } = require('./Models');
	let users = await Users.where({ id: 1 }).fetch({ require: false });
	if (users) {
		users = users.toJSON();
	}

	res.json(users);
});

/**
 * Insert a user into the databse
 * The query is ran inside a transaction.
 * If there's an error, it will be rolled back accordingly.
 */
app.get('/insert', async (req, res) => {
	const bookshelf = require('./db');
	await bookshelf
		.transaction(async (trx) => {
			const { Users } = require('./Models');

			let user = new Users({
				first_name: 'INSERTED USER',
				last_name: 'INSERTED LAST NAME',
			});

			user = await user.save(null, { transacting: trx });
			if (user) {
				user = user.toJSON();
			}

			// throw new Error('NO SAVE');

			res.json({
				user,
			});
		})
		.catch((e) => {
			const { stack, message } = e;

			res.json({
				stack,
				message,
			});
		});
});

/**
 * Update a user in the database
 */
app.get('/update', async (req, res) => {
	const bookshelf = require('./db');
	await bookshelf
		.transaction(async (trx) => {
			const { Users } = require('./Models');

			let user = await Users.where({ id: 24 }).save(
				{ first_name: 'UPDATED' },
				{
					patch: true,
					transacting: trx,
				}
			);

			if (user) {
				user = user.toJSON();
			}

			res.json({
				user,
			});
		})
		.catch((e) => {
			const { stack, message } = e;

			res.json({
				stack,
				message,
			});
		});
});

/**
 * Delete a database entry
 */
app.get('/destroy', async (req, res) => {
	const bookshelf = require('./db');
	await bookshelf
		.transaction(async (trx) => {
			const { Users } = require('./Models');

			let user = await Users.where({ id: 24 }).destroy({
				transacting: trx,
			});

			if (user) {
				user = user.toJSON();
			}

			res.json({
				user,
			});
		})
		.catch((e) => {
			const { stack, message } = e;

			res.json({
				stack,
				message,
			});
		});
});

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
	console.log(`Express is listening at PORT ${PORT}`);
});
