const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
	name: {
		first: String,
		last: String
	},
	desc: String,
	profileImg: String,
	age: Number,
	images: [
		String
	],
	specialty: String,
	experience: Number,
	category: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"	 	
		}
	],
	creator: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model('Photographer', photographerSchema);