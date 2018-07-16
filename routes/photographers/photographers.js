const 	Photographer = require('../../schemas/photographer'),
		express = require('express'),
		middleware = require('../../middleware'),
		router = express.Router();

router.get('/', (req, res) => {
	Photographer.find({}, (err, photographers) => {
		if(err) {
			console.log('error');
		} else {
			res.render('photographers/index', {photographers: photographers});
		}
	})
})

router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render('photographers/new');
})

//add photographer
router.post('/', middleware.isLoggedIn, (req, res) => {
	const pg = req.body.photographer;
	const newPhotographer = {
		name: pg.name,
		img: pg.img,
		desc: pg.desc,
		creator: {
			username: req.user.username,
			id: req.user._id
		}
	}

	Photographer.create(newPhotographer, (err, photographer) => {
		if(err) {
			req.flash('error', 'Photographer was unable to be created. Please try again later.')
		} else {
			res.redirect('/photographers');
		}
	})
});

//show route
router.get('/:id', (req, res) => {
	const pgId = req.params.id;
	Photographer.findOne({_id: pgId}).populate('comments').exec((err, photographer) => {
		if(err) {
			req.flash('error', 'Unable to find any photographers for some reason...please try again later!');
		} else {
			res.render('photographers/show', {photographer: photographer});
		}
	});
})

router.delete('/:id', middleware.checkOwnership('photographer'), (req, res) => {
	Photographer.findByIdAndDelete({_id: req.params.id}, (err) => {
		if(err) {
			req.flash('Could not delete photographer.');
		} else {
			res.redirect('/photographers');
		}
	})
})

//edit route
router.get('/:id/edit', middleware.checkOwnership('photographer'), (req, res) => {
	Photographer.findOne({_id: req.params.id}, (err, photographer) => {
		if(err) {
			req.flash('error', "Something went wrong with the edit page...please try again later!");
		} else {
			res.render('photographers/edit', {photographer: photographer});
		}
	})
})

router.put('/:id', middleware.checkOwnership('photographer'), (req, res) => {
	Photographer.findByIdAndUpdate({_id: req.params.id}, req.body.pg, (err, photographer) => {
		if(err) {
			req.flash('error', 'There was some problem updating this photographer...please try again later.');
		} else {
			res.redirect('/photographers/' + req.params.id);
		}
	})
})

module.exports = router;