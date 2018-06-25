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

//modular routes
const	comments = require('./routes/comments'),
	 	index = require('./routes/index'),
		models = require('./routes/models');

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

app.use(function(req, res, next){
	console.log(req.user);
   	res.locals.currentUser = req.user;
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


//listening to port
app.listen(port, () => {
	console.log('The server is up and running!');
});