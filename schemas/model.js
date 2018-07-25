const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
	name: String,
	category: String,
	image: String,
	desc: String,
	age: Number,
	experience: String,
	height: Number,
	eyeColor: String,
	ethnicity: String,
	tattoo: String,
	hairColor: String,
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
	},
	images: []
})

module.exports = mongoose.model('Model', modelSchema);