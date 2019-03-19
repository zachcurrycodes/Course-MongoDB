const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
	mongoose.connect('192.168.1.119:32771/users_test');
	mongoose.connection
		.once('open', () => {
			done();
		})
		.on('error', error => {
			console.warn('Warning', error);
		});
});

beforeEach(done => {
	const { users, comments, blogposts } = mongoose.connection.collections;
	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
});
