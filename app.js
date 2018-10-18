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
	 	middleware = require('./middleware'),
		seedDB = require('./seeds');

//modular routes
const	comments = require('./routes/models/comments'),
	 	index = require('./routes/index'),
	 	photographers = require('./routes/photographers/photographers'),
	 	photographerComments = require('./routes/photographers/comments'),
		models = require('./routes/models/models');

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/slick-carousel/slick/'));
app.use(express.static(__dirname + '/node_modules/masonry-layout/dist/'));
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

app.locals.isModel = 'THIS IS THE LOCALS';
app.use(function(req, res, next){
   	res.locals.currentUser = req.user;
   	res.locals.error = req.flash('error');
   	res.locals.success = req.flash('success');
   	res.locals.isModel = false;
   	next();
});

//connect to db
mongoose.connect(process.env.DATABASEURL);
//check if connection to db was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('DB succesfully connected!');
})

// //input sample data into DB
seedDB();

app.use('/', index);
app.use('/models/', models);
app.use('/models/:id/comments', comments);
app.use('/photographers/', photographers);
app.use('/photographers/:id/comments/', photographerComments);


//listening to port
app.listen(port, () => {
	console.log('The server is up and running!');
});