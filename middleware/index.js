const 	Model = require('../schemas/model'),
		Photographer = require('../schemas/photographer');

const middleware = {};
middleware.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Please log in first");
		res.redirect('/login');
	}
}

middleware.checkOwnership = function(req, res, next) {
	// console.log(`This is the middleware ${req.app.locals}`);
	//check if user is logged in
	if(req.isAuthenticated()) {
		// find model
		Model.findOne({_id: req.params.id}, (err, model) => {
			if(err) {
				req.flash('error', 'Unable to find model.')
			} else {
	//compare id of user who created model and user who is logged in;
				if(model.creator.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'Authorization error');
					res.redirect('/models');
				}
			}
		})		
	} else {
		req.flash('error', 'You need to be logged in first!')
		res.redirect('/login');
	}
}

// middleware.checkPgOwnership = function(req, res, next) {
// 	if(req.isAuthenticated()) {
// 		// find photographer
// 		Photographer.findOne({_id: req.params.id}, (err, photographer) => {
// 			if(err) {
// 				req.flash('error', 'Unable to find model.')
// 			} else {
// 	//compare id of user who created photographer and user who is logged in;
// 				if(photographer.creator.id.equals(req.user._id)) {
// 					next();
// 				} else {
// 					req.flash('error', 'Authorization error');
// 					res.redirect('/photographers');
// 				}
// 			}
// 		})		
// 	} else {
// 		req.flash('error', 'You need to be logged in first!')
// 		res.redirect('/login');
// 	}
// }

middleware.checkOwnership = function(type) {
	return function(req, res, next) {
		if(req.isAuthenticated()) {
			if(type === 'photographer') {
				//run auth for model
				//find current model and the user id that created it
				Photographer.findOne({_id: req.params.id}, (err, model) => {
					if(err) {
						console.log(err);
					} else {
						if(model.creator.id.equals(req.user._id)) {
							next();
						} else {
							console.log('shit dont match');
						}
					}
				})
				//check current user id with user id that created the model
				//if it matches go next
			} else {
				//run auth for photographer
				console.log('this is for the models');
			}			
		}
	}
}
module.exports = middleware;