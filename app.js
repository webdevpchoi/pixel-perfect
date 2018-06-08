const 	express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser');

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
//create mongoose schema
const modelSchema = mongoose.Schema({
	name: String,
	image: String
})
//compile schema into model so it had methods available to maniuplate data
//first argument of model is the singular name of the collection your model is for
const Model = mongoose.model('Model', modelSchema);


app.get('/', (req, res) => res.render('landing'));

app.get('/models', (req, res) => {
		Model.find({}, (err, models) => {
		if(err) {
			console.log('Could not find the models');
		} else {
			res.render("models", {models: models})
		}
	})
});

app.post('/models', (req, res) => {
	const name = req.body.name;
	const imageUrl = req.body.image;

	const model = new Model({
		name: name,
		image: imageUrl,
	})

	model.save((err, model) => {
		if(err) {
			console.log(err);
		} else {
			console.log(model);
		}
	})

})

//listening to port
app.listen(port, () => {
	console.log('The server is up and running!');
});