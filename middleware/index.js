const Model = require('../schemas/model');
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

module.exports = middleware;