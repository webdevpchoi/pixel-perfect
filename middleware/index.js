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

// middleware.checkOwnership = function(req, res, next) {
// 	// console.log(`This is the middleware ${req.app.locals}`);
// 	//check if user is logged in
// 	if(req.isAuthenticated()) {
// 		// find model
// 		Model.findOne({_id: req.params.id}, (err, model) => {
// 			if(err) {
// 				req.flash('error', 'Unable to find model.')
// 			} else {
// 	//compare id of user who created model and user who is logged in;
// 				if(model.creator.id.equals(req.user._id)) {
// 					next();
// 				} else {
// 					req.flash('error', 'Authorization error');
// 					res.redirect('/models');
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
				Photographer.findOne({_id: req.params.id}, (err, photographer) => {
					if(err) {
						console.log(err);
					} else {
						if(photographer.creator.id.equals(req.user._id)) {
							next();
						} else {
							console.log('This user is not authorized');
						}
					}
				})
				//check current user id with user id that created the model
				//if it matches go next
			} 
			else if (type === 'model') {
				Model.findOne({_id: req.params.id}, (err, model) => {
					if(err) {
						console.log(err);
					} else {
						if(model.creator.id.equals(req.user._id)) {
							next();
						} else {
							console.log('This user is not authorized');
						}
					}
				})
			} else {
				console.log('Parameter must be model or photographer');
			}
		}
	}
}
module.exports = middleware;