const 	express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser');
		Model = require('./schemas/model');
		seedDB = require('./seeds');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

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

//index route
app.get('/models', (req, res) => {
		Model.find({}, (err, models) => {
		if(err) {
			console.log('Could not find the models');
		} else {
			res.render("models", {models: models})
		}
	})
});

//new route
app.get('/models/new', (req, res) => {
	res.render('newModel');
})

//show route
app.get('/models/:id', (req, res) => {
	const userId = req.params.id;
	Model.findOne({_id: userId}).populate('comments').exec((err, model) => {
		console.log(model);
		res.render('show', {model: model})
	})
});

//post route
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

//listening to port
app.listen(port, () => {
	console.log('The server is up and running!');
});