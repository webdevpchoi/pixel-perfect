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
			console.log(err);
		} else {
			console.log(`Here's the new photographer: ${photographer}`);
			res.redirect('/photographers');
		}
	})
});

//show route
router.get('/:id', (req, res) => {
	const pgId = req.params.id;
	Photographer.findOne({_id: pgId}).populate('comments').exec((err, photographer) => {
		if(err) {
			console.log(err);
		} else {
			res.render('photographers/show', {photographer: photographer});
		}
	});
})

router.delete('/:id', middleware.checkOwnership('photographer'), (req, res) => {
	Photographer.findByIdAndDelete({_id: req.params.id}, (err) => {
		if(err) {
			console.log('Something wrong with deleting');
		} else {
			res.redirect('/photographers');
		}
	})
})

//edit route
router.get('/:id/edit', middleware.checkOwnership('photographer'), (req, res) => {
	Photographer.findOne({_id: req.params.id}, (err, photographer) => {
		if(err) {
			console.log(err)
		} else {
			res.render('photographers/edit', {photographer: photographer});
		}
	})
})

router.put('/:id', middleware.checkOwnership('photographer'), (req, res) => {
	Photographer.findByIdAndUpdate({_id: req.params.id}, req.body.pg, (err, photographer) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/photographers/' + req.params.id);
		}
	})
})

module.exports = router;