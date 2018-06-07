const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
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
const locationSchema = mongoose.Schema({
	name: String
})
//compile schema into model so it had methods available to maniuplate data
//first argument of model is the singular name of the collection your model is for
const Location = mongoose.model('Location', locationSchema);

const happyPlace = new Location({
	name: "The Happy Place",
})

happyPlace.save(function(err, happyPlace) {
	if(err) {
		console.log('This didn\'t save to the DB!')
	} else {
		console.log(happyPlace);
	}
})
app.get('/', (req, res) => res.render('landing'));

app.listen(port, () => {
	console.log('The server is up and running!');
});