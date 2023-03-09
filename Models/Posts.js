const bookshelf = require('../db');

// Defining models
const Posts = bookshelf.model('Posts', {
	tableName: 'posts',
	users() {
		return this.belongsTo('Users', 'user_id');
	},
});

module.exports = Posts;
