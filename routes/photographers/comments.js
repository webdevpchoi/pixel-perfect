const	Comment = require('../../schemas/comment'),
	 	middleware = require('../../middleware'),
		Photographer = require('../../schemas/photographer'),
	 	express = require('express'),
		router = express.Router({mergeParams: true});

router.get('/comments/new', (req, res) => {
	console.log('this route');
	res.locals.isModel = false;
	const id = req.params.id;
	Photographer.findOne({_id: req.params.id}, (err, photographer) => {
		if(err) {
			console.log(err);
		} else {
			res.render('comments/new', {photographer: photographer, id: id});
		}
	})
})

router.post('/comments', (req, res) => {
	Photographer.findOne({_id: req.params.id}, (err, photographer) => {
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					photographer.comments.push(comment);
					photographer.save();
					res.redirect(`/photographers/${req.params.id}`);
				}
			})
		}
	})
})

router.get('/:comment_id/edit', (req, res) => {
	res.locals.isModel = false;
	const pgId = req.params.id
	Comment.findOne({_id: req.params.comment_id}, (err, comment) => {
		if(err) {
			console.log(err);
		} else {
			res.render('comments/edit', {comment: comment, pgId: pgId});
		}
	})
})

router.put('/:comment_id', (req, res) => {
	Comment.findByIdAndUpdate({_id: req.params.comment_id}, req.body.comment, (err, comment) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect(`/photographers/${req.params.id}/`);
		}
	} )
})

router.delete ('/:comment_id', (req, res) => {
	Comment.findByIdAndDelete({_id: req.params.comment_id}, (err) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect(`/photographers/${req.params.id}`);
		}
	})
})

module.exports = router;