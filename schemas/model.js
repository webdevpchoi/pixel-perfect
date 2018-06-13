const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
	name: String,
	image: String,
	desc: String,
})

module.exports = mongoose.model('Model', modelSchema);