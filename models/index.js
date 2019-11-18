//model-layer utility functions

const mongoose = require('mongoose');

// Importing models
const UserPost = require('./Feedpage.js');

function connect() {
	return mongoose.connect('mongodb://localhost:27017/userdb',{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}

module.exports = {
	models: {
		UserPost: UserPost
	},
	connect: connect
};
