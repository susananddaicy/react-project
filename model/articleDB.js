var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: String,
	author: String,
	text: String,
	time: Date
});


module.exports = articleSchema;

