const 	mongoose = require('mongoose'),
		// passport = require('passport'),
		Model = require('./schemas/model'),
		Photographer = require('./schemas/photographer'),
		User = require('./schemas/user'),
		Comment = require('./schemas/comment');



const sampleModels = [
	{
		name: {
			first: "Melissa",
			last: "Johnson"
		},
		profileImg: "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?cs=srgb&dl=beautiful-female-girl-247322.jpg&fm=jpg",
		desc: "Modeling for only 2 years, Melissa has mastered it all within a short time period.",
		category: "Street",
		creator:{},
		height: {
			feet: 4,
			inches: 5
		},
		eyeColor: "Blue",
		ethnicity: "African-American",
		hairColor: "Black",
		experience: 5,
		age: 20,
		tattoo: "Yes",
		images: ["https://images.pexels.com/photos/247295/pexels-photo-247295.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/289225/pexels-photo-289225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/37649/glamour-style-hat-woman-37649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/165522/pexels-photo-165522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
	},
	{
		name: {
			first: "Crazy",
			last: "Al"
		},
		profileImg: "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		desc: "Modeling for only 2 years, Melissa has mastered it all within a short time period.",
		category: "Street",
		creator:{},
		height: {
			feet: 4,
			inches: 5
		},
		eyeColor: "Blue",
		ethnicity: "African-American",
		hairColor: "Black",
		experience: 5,
		age: 20,
		tattoo: "Yes",
		images: ["https://images.pexels.com/photos/247295/pexels-photo-247295.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/289225/pexels-photo-289225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/37649/glamour-style-hat-woman-37649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/165522/pexels-photo-165522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
	},
	{
		name: {
			first: "Scarlett",
			last: "Johanson"
		},
		profileImg: "https://images.pexels.com/photos/39653/girls-woman-female-beautiful-39653.jpeg?cs=srgb&dl=beautiful-caucasian-female-39653.jpg&fm=jpg",
		desc: "Modeling for only 2 years, Melissa has mastered it all within a short time period.",
		category: "Street",
		creator:{},
		height: {
			feet: 4,
			inches: 5
		},
		eyeColor: "Blue",
		ethnicity: "African-American",
		hairColor: "Black",
		experience: 5,
		age: 20,
		tattoo: "Yes",
		images: ["https://images.pexels.com/photos/247295/pexels-photo-247295.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/289225/pexels-photo-289225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/37649/glamour-style-hat-woman-37649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/165522/pexels-photo-165522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
	},
	{
		name: {
			first: "Robert",
			last: "Downey"
		},
		profileImg: "https://images.pexels.com/photos/160628/girls-lavender-two-dresses-160628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		desc: "Modeling for only 2 years, Melissa has mastered it all within a short time period.",
		category: "Street",
		creator:{},
		height: {
			feet: 4,
			inches: 5
		},
		eyeColor: "Blue",
		ethnicity: "African-American",
		hairColor: "Black",
		experience: 5,
		age: 20,
		tattoo: "Yes",
		images: ["https://images.pexels.com/photos/247295/pexels-photo-247295.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/289225/pexels-photo-289225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/37649/glamour-style-hat-woman-37649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/165522/pexels-photo-165522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
	}
]

const samplePhotographers = [
	{
		name: {
			first: "Chris",
			last: "Evans"
		},
		desc: "I take photos of stuff",
		profileImg: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		specialty: "Street Photography",
		creator: {},
		age: 34,
		category: "Nature",
		experience: 23,
	},

	{
		name: {
			first: "Jaques",
			last: "Crescent"
		},
		desc: "I take photos of stuff",
		profileImg: "https://images.pexels.com/photos/108148/pexels-photo-108148.jpeg?auto=compress&cs=tinysrgb&h=350",
		specialty: "Street Photography",
		creator: {},
		age: 34,
		category: "Nature",
		experience: 23,
	},
	{
		name: {
			first: "Titan",
			last: "Gi-ant"
		},
		desc: "I take photos of stuff",
		profileImg: "https://images.pexels.com/photos/1156540/pexels-photo-1156540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		specialty: "Street Photography",
		creator: {},
		age: 34,
		category: "Nature",
		experience: 23,
	},
	{
		name: {
			first: "Titan",
			last: "Gi-ant"
		},
		desc: "I take photos of stuff",
		profileImg: "https://images.pexels.com/photos/108148/pexels-photo-108148.jpeg?auto=compress&cs=tinysrgb&h=350",
		specialty: "Street Photography",
		creator: {},
		age: 34,
		category: "Nature",
		experience: 23,
	},{
		name: {
			first: "Titan",
			last: "Gi-ant"
		},
		desc: "I take photos of stuff",
		profileImg: "https://images.pexels.com/photos/898766/pexels-photo-898766.jpeg?cs=srgb&dl=camera-daylight-daytime-898766.jpg&fm=jpg",
		specialty: "Street Photography",
		creator: {},
		age: 34,
		category: "Nature",
		experience: 23,
	},{
		name: {
			first: "Titan",
			last: "Gi-ant"
		},
		desc: "I take photos of stuff",
		profileImg: "https://images.pexels.com/photos/238343/pexels-photo-238343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		specialty: "Street Photography",
		creator: {},
		age: 34,
		category: "Nature",
		experience: 23,
	},{
		name: {
			first: "Titan",
			last: "Gi-ant"
		},
		desc: "I take photos of stuff",
		profileImg: "https://images.pexels.com/photos/546160/pexels-photo-546160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		specialty: "Street Photography",
		creator: {},
		age: 34,
		category: "Nature",
		experience: 23,
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
							//remove all current photographers in db
							Photographer.remove({}, (err) => {
								if(err) {
									console.log(err)
								} else {
									console.log('All photographers removed!');
									//find the default user in db
									User.findOne({username: 'John Test'}, (err, found) => {
										if(err) {
											console.log(err);
										} else {
											console.log(found);
												sampleModels.forEach((modelData) => {
													//assign a reference from each model to default user
													modelData.creator.id = found._id;
													modelData.creator.username = found.username;
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
																	comment.author.id = createdUser._id;
																	comment.author.username = createdUser.username;
																	comment.save();
																	model.comments.push(comment);
																	model.save();
																	console.log('New comment created!');
																}
															})
														}
													})
												})
												samplePhotographers.forEach((photographer) => {
													//create new models
													Photographer.create(photographer, (err, photographer) => {
														if(err) {
															console.log(err);
														} else {
															console.log(`Added photographer ${photographer.name}`);
															Comment.create({
																text: "This is the default comment for the PHOTOGRAPHER.",
																author: {
																	username: johnTest.username,
																},
															}, (err, newComment) => {
																if(err) {
																	console.log(err)
																} else {
																	console.log(`Comment added for photographer`);
																	newComment.author.id = createdUser._id;
																	newComment.author.username = createdUser.username;
																	newComment.save();
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
			})
		}
	})
}

module.exports = seedDB;