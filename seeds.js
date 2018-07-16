const 	mongoose = require('mongoose'),
		// passport = require('passport'),
		Model = require('./schemas/model'),
		Photographer = require('./schemas/photographer'),
		User = require('./schemas/user'),
		Comment = require('./schemas/comment');



const data = [
	{
		name: "Melissa",
		image: "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		desc: "Modeling for only 2 years, Melissa has mastered it all within a short time period.",
		creator:{}
	},
	{
		name: "John Smith",
		image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "Despite his unoriginal name, John makes a mark on modeling history with his signature dead-eyed-mackeral facial expressions",
		creator:{}
	},
	{
		name: "John Park",
		image: "https://images.pexels.com/photos/450214/pexels-photo-450214.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "A sea of Asians could surround this particular model, and he'd STILL stand out. That's how good he is!",
		creator:{}
	},
	{
		name: "Ashley Sins",
		image: "https://images.pexels.com/photos/301298/pexels-photo-301298.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "She might only have 10/10 vision, but Ashley's singature bangs gives her a signature BANG.",
		creator:{}
	}
]

const samplePhotographers = [
	{
		name: "Craig",
		desc: "I take photos of stuff",
		img: "https://images.pexels.com/photos/108148/pexels-photo-108148.jpeg?auto=compress&cs=tinysrgb&h=350",
		specialty: "Street Photography",
		creator: {}
	},

	{
		name: "Jennifer",
		desc: "I enjoy the fresh air, and nature's beauty.",
		img: "https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&h=350",
		specialty: "Outdoor Photography",
		creator: {}
	},
	{
		name: "Jane",
		desc: "Buildings are the the building blocks of civilization.",
		img: "https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&h=350",
		specialty: "Outdoor Photography",
		creator: {}
	},
]


function seedDB() {

	//remove sample users to db
	User.remove({}, (err) => {
		if(err) {
			console.log('Trouble removing current users.');
		} else {
			console.log('All user login db removed.');
			//register sample users to db			
			const johnTest = new User({username: 'John Test'});
			User.register(johnTest, 'notsecure', (err, createdUser) => {
				if(err) {
					console.log(`Could not create login data for user ${user.username}.`);
					console.log(err);
				} else {
					console.log('Login credentials for John Test created.');
					//remove all current models in db
					Model.remove({}, (err) => {
						if(err) {
							console.log('Seeds File Error: Models were not removed.');
						} else {
							console.log('All Models Removed!')
							User.findOne({username: 'John Test'}, (err, found) => {
								if(err) {
									console.log(err);
								} else {
									data.forEach((modelData) => {
										//assign a test user id to model
										modelData.creator.id = found._id;
										console.log(modelData)
										//create new models
										Model.create(modelData, (err, model) => {
											if(err) {
												console.log(err);
											} else {
												console.log('A model was created!');
												//create a comment for each model
												Comment.create({
													text: "This is a sample comment!",
													author: johnTest.username,
												}, (err, comment) => {
													if(err) {
														console.log(err);
													} else {
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
					})

					Photographer.remove({}, (err) => {
						if(err) {
							console.log(err)
						} else {
							console.log('All photographers removed!');
							samplePhotographers.forEach((photographer) => {
								Photographer.create(photographer, (err, photographer) => {
									if(err) {
										console.log(err)
									} else {
										console.log(`Added photographer ${photographer.name}`);
										Comment.create({
											text: "This is the default comment for the PHOTOGRAPHER.",
											author: {
												username: "Generic User",
											},
										}, (err, newComment) => {
											if(err) {
												console.log(err)
											} else {
												console.log(`Comment added for photographer`);
												photographer.comments.push(newComment);
												photographer.save();
											}
										})
									}
								})
							})
						}
					})
				}
			})
		}
	})
}

module.exports = seedDB;