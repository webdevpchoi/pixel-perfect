const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
	name: String,
	desc: String,
	img: String,
	specialty: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"	 	
		}
	]
});

module.exports = mongoose.model('Photographer', photographerSchema);