const	Comment = require('../schemas/comment'),
	 	middleware = require('../middleware'),
		Model = require('../schemas/model'),
	 	express = require('express'),
		router = express.Router({mergeParams: true});
		
//post route for new comments
router.post('/', middleware.isLoggedIn, (req, res) => {
	Model.findOne({_id: req.params.id}, (err, model) => {
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					req.flash('error', 'Your comment was unable to be created');
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					model.comments.push(comment);
					model.save();
					req.flash('success', 'Your comment was successfully added!')
					res.redirect('/models/' + model._id);
				}
			})
		}
	})
});

//get route for new comments
router.get('/new', middleware.isLoggedIn, (req, res) => {
	Model.findOne({_id: req.params.id}, (err, model) => {
		if(err) {
			console.log(err)
		} else {
			console.log(model);
			res.render('comments/new', {model: model});
		}
	})
})

//edit route for comments
router.get('/:comment_id/edit', (req, res) => {
	const campgroundId = req.params.id;
	Comment.findOne({_id: req.params.comment_id}, (err, comment) => {
		if(err) {
			res.send('Error editing comment!');
		} else {
			res.render('comments/edit', {comment: comment, campgroundId: campgroundId});
		}
	})
})

router.post('/:comment_id', (req, res) => {
	Comment.findByIdAndUpdate({_id: req.params.comment_id},  req.body.comment, (err, comment) => {
		if(err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Your comment was successfully edited.');
			res.redirect('/models/' + req.params.id);
		}
	})
})

//delete route for comments
router.delete('/:comment_id', (req, res) => {
	Comment.findByIdAndRemove({_id: req.params.comment_id}, (err) => {
		if(err) {
			res.send('Comment could not be deleted');
		} else {
			req.flash('success', 'Your comment was successfully deleted');
			res.redirect(`/models/${req.params.id}`)
		}
	})
})

module.exports = router;