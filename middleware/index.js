const 	Model = require('../schemas/model'),
		Comment = require('../schemas/comment'),
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
			} else if(type === 'comment') {
				Comment.findOne({_id : req.params.comment_id}, (err, comment) => {
					if(err) {
						console.log(err);
					} else {
						if(comment.author.id.equals(req.user._id)) {
							next();
						} else {
							console.log('This user is not authorized');
						}
					}
				})
			} 
			else {
				console.log('Parameter must be model, photographer, or comment');
			}
		}
	}
}
module.exports = middleware;