const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
	name: String,
	desc: String,
	img: String,
	specialty: String,
});

module.exports = mongoose.model('Photographer', photographerSchema);