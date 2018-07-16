const	passport = require('passport'),
	 	middleware = require('../middleware'),
		User = require('../schemas/user'),
		express = require('express'),
		router = express.Router();

router.get('/', (req, res) => res.render('landing'));

//auth routes
router.get('/login', (req, res) => {
	res.render('auth/login');
})

router.post('/login', passport.authenticate('local', 
{
	successRedirect: '/',
	failureRedirect:'/login',
}), (req, res) => {
});

router.get('/signup', (req, res) => {
	res.render('auth/signup');
})

router.post('/signup', (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err) {
			req.flash('error', err.message);
			res.render('auth/signup');
		} else {
			passport.authenticate('local')(req, res, function() {
				req.flash('success', 'Welcome to Pixel Perfect!');
				res.redirect('/');
			})
		}
	});
});

router.get('/logout', (req, res) => {
	req.flash('success', `Logged Out`)
	req.logout();
	res.redirect('/');
})

module.exports = router;
