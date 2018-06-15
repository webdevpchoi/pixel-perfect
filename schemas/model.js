const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
	name: String,
	image: String,
	desc: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"	
		}
	]
})

module.exports = mongoose.model('Model', modelSchema);