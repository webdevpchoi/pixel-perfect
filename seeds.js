const 	mongoose = require('mongoose'),
		Model = require('./schemas/model');
		Comment = require('./schemas/comment');



const data = [
	{
		name: "Melissa",
		image: "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		desc: "Modeling for only 2 years, Melissa has mastered it all within a short time period."
	},
	{
		name: "John Smith",
		image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "Despite his unoriginal name, John makes a mark on modeling history with his signature dead-eyed-mackeral facial expressions",
	},
	{
		name: "John Park",
		image: "https://images.pexels.com/photos/450214/pexels-photo-450214.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "A sea of Asians could surround this particular model, and he'd STILL stand out. That's how good he is!"
	},
	{
		name: "Ashley Sins",
		image: "https://images.pexels.com/photos/301298/pexels-photo-301298.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "She might only have 10/10 vision, but Ashley's singature bangs gives her a signature BANG."
	}
]

function seedDB() {
	//remove all current data
	Model.remove({}, (err) => {
		if(err) {
			console.log(err);
		} else {
			console.log('All Models Removed!')
			data.forEach((modelData) => {
				//create new models
				Model.create(modelData, (err, model) => {
					if(err) {
						console.log(err);
					} else {
						console.log('A model was created!');
						//create a comment for each model
						Comment.create({
							text: "This is the first comment for this user!",
							author: "Thanos",
						}, (err, comment) => {
							if(err) {
								console.log(err);
							} else {
								console.log(model);
								model.comments.push(comment);
								model.save();
								console.log('New comment created!');
							}
						})
					}
				})
			})
		}
	})
}

module.exports = seedDB;