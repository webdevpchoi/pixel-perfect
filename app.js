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
	image: String,
	desc: String,
})
//compile schema into model so it had methods available to maniuplate data
//first argument of model is the singular name of the collection your model is for
const Model = mongoose.model('Model', modelSchema);

//remove all sample models
Model.deleteMany((err, dltedModels) => {
	if(err) {
		console.log(err)
	} else {
		console.log('Everything was deleted at the start!');
	}
});

//sample models
Model.insertMany([
	{
		name: "Melissa",
		image: "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		desc: "Modeling for only 2 years, Melissa has mastered it all within a short time period."
	},
	{
		name: "John Smith",
		image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "Despite his unoriginal name, John makes a mark on modeling history with his signature dead-eyed-mackeral facial expressions",
	},
	{
		name: "John Park",
		image: "https://images.pexels.com/photos/450214/pexels-photo-450214.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "A sea of Asians could surround this particular model, and he'd STILL stand out. That's how good he is!"
	},
	{
		name: "Ashley Sins",
		image: "https://images.pexels.com/photos/301298/pexels-photo-301298.jpeg?auto=compress&cs=tinysrgb&h=350",
		desc: "She might only have 10/10 vision, but Ashley's singature bangs gives her a signature BANG."
	}
], (err, sampleModels) => {
	if(err) {
		console.log(err);
	} else {
		console.log("All sample models added to database!")
	}
})


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
	Model.findById(userId, (err, user) => {
		res.render('show', {user: user});
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