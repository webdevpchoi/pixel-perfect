const 	LocalStrategy = require('passport-local'),
		Comment = require('./schemas/comment'),
		session = require('express-session'),
		bodyParser = require('body-parser'),
		Model = require('./schemas/model'),
		User = require('./schemas/user'),
		mongoose = require('mongoose'),
		passport = require('passport'),
	 	express = require('express'),
		seedDB = require('./seeds');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(require("express-session")({
    secret: "Beauty is in the eye of the beholder.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to db
mongoose.connect('mongodb://localhost/tgr');
//check if connection to db was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('DB succesfully connected!');
})

//input sample data into DB
seedDB();

app.get('/', (req, res) => res.render('landing'));

//model index route
app.get('/models', (req, res) => {
		Model.find({}, (err, models) => {
		if(err) {
			console.log('Could not find the models');
		} else {
			res.render("models/index", {models: models})
		}
	})
});

//new model route
app.get('/models/new', (req, res) => {
	res.render('models/new');
})

//show route
app.get('/models/:id', (req, res) => {
	const userId = req.params.id;
	Model.findOne({_id: userId}).populate('comments').exec((err, model) => {
		res.render('models/show', {model: model})
	})
});

//post route model
app.post('/models', (req, res) => {
	const name = req.body.name;
	const imageUrl = req.body.image;
	const desc = req.body.desc;

	const model = new Model({
		name: name,
		image: imageUrl,
		desc: desc,
	})

	Model.create(model, (err, model) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('models');
		}
	})

})

//auth routes
app.get('/login', (req, res) => {
	res.render('auth/login');
})

app.post('/login', passport.authenticate('local', 
{
	successRedirect: '/',
	failureRedirect:'/login',
}), (req, res) => {
});

app.get('/signup', (req, res) => {
	res.render('auth/signup');
})

app.post('/signup', (req, res) => {
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

//get route for new comments
app.get('/models/:id/comments/new', (req, res) => {
	Model.findOne({_id: req.params.id}, (err, model) => {
		if(err) {
			console.log(err)
		} else {
			console.log(model);
			res.render('comments/new', {model: model});
		}
	})
})

//post route for new comments
app.post('/models/:id/comments', (req, res) => {
	Model.findOne({_id: req.params.id}, (err, model) => {
		if(err) {
			console.log('no model');
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					console.log('COMMENT WAS NOT CREATED');
				} else {
					model.comments.push(comment);
					model.save();
					res.redirect('/models/' + model._id);
				}
			})
		}
	})
});

//listening to port
app.listen(port, () => {
	console.log('The server is up and running!');
});