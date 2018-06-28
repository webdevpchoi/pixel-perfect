const	passport = require('passport'),
		express = require('express'),
		User = require('../schemas/user');
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
			console.log(err);
			return res.render('signup');
		} else {
			passport.authenticate('local')(req, res, function() {
				console.log('user was created and authenticated!');
				res.redirect('/');
			})
		}
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	console.log('User is now logged out!');
	res.redirect('/');
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
