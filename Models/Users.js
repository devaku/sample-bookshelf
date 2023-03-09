const bookshelf = require('../db');

// Defining models
const Users = bookshelf.model('Users', {
	tableName: 'users',
	posts() {
		return this.hasMany('Posts', 'user_id');
	},
});

module.exports = Users;
