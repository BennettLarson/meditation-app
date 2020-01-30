const mongo = require('mongoose');
const Schema = mongo.Schema;

const userSchema = new Schema({
	name: String,
	username: String,
	password: String,
	loggedIn: Boolean,
});

module.exports = mongo.model('User', userSchema);
