const	Comment = require('../schemas/comment'),
		Model = require('../schemas/model'),
	 	express = require('express'),
		router = express.Router({mergeParams: true});
		
//post route for new comments
router.post('/', isLoggedIn, (req, res) => {
	Model.findOne({_id: req.params.id}, (err, model) => {
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					console.log('COMMENT WAS NOT CREATED');
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					model.comments.push(comment);
					model.save();
					res.redirect('/models/' + model._id);
				}
			})
		}
	})
});

//get route for new comments
router.get('/new', isLoggedIn, (req, res) => {
	Model.findOne({_id: req.params.id}, (err, model) => {
		if(err) {
			console.log(err)
		} else {
			console.log(model);
			res.render('comments/new', {model: model});
		}
	})
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}


module.exports = router;