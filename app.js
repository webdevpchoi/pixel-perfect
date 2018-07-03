const	Photographer = require('./schemas/photographer'),
		methodOverride = require('method-override'),
		LocalStrategy = require('passport-local'),
		Comment = require('./schemas/comment'),
		session = require('express-session'),
		bodyParser = require('body-parser'),
		Model = require('./schemas/model'),
		flash = require('connect-flash'),
		User = require('./schemas/user'),
		mongoose = require('mongoose'),
		passport = require('passport'),
	 	express = require('express'),
		seedDB = require('./seeds');

//modular routes
const	comments = require('./routes/comments'),
	 	index = require('./routes/index'),
		models = require('./routes/models');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

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

app.use(function(req, res, next){
   	res.locals.currentUser = req.user;
   	res.locals.error = req.flash('error');
   	res.locals.success = req.flash('success');
   	next();
});

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

app.use('/', index);
app.use('/models/', models);
app.use('/models/:id/comments', comments);

app.get('/photographers', (req, res) => {
	Photographer.find({}, (err, photographers) => {
		if(err) {
			console.log('error');
		} else {
			res.render('photographers/index', {photographers: photographers});
		}
	})
})

app.get('/photographers/new', (req, res) => {
	res.render('photographers/new');
})

app.post('/photographers', (req, res) => {
	const pg = req.body.photographer;
	const newPhotographer = {
		name: pg.name,
		img: pg.img,
		desc: pg.desc,
	}

	Photographer.create(newPhotographer, (err, photographer) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/photographers');
		}
	})
});

app.get('/photographers/:id', (req, res) => {
	const pgId = req.params.id;
	Photographer.findOne({_id: pgId}).populate('comments').exec((err, photographer) => {
		if(err) {
			console.log(err);
		} else {
			res.render('photographers/show', {photographer: photographer});
		}
	});
})

app.delete('/photographers/:id', (req, res) => {
	Photographer.findByIdAndDelete({_id: req.params.id}, (err) => {
		if(err) {
			console.log('Something wrong with deleting');
		} else {
			res.redirect('/photographers');
		}
	})
})

//listening to port
app.listen(port, () => {
	console.log('The server is up and running!');
});