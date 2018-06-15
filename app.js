const 	express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		Model = require('./schemas/model'),
		Comment = require('./schemas/comment'),
		seedDB = require('./seeds');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

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
			console.log(model);
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
	res.send('your comment was added!')
});

//listening to port
app.listen(port, () => {
	console.log('The server is up and running!');
});