var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//172.0.0.1:27017
mongoose.connect('mongodb://127.0.0.1/app');

var mySchema = mongoose.Schema({
	teamChoice: String,
	name: String
});

var ChoiceModel = mongoose.model('choices', mySchema);

//localhost:3000/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Luis Montejano' });
});

router.get('/chivas', function(req, res) {

	var responseObject = { message: 'OK' };
	res.send(responseObject);
});

var database = [];

router.post('/favoriteTeam/:teamChoice/:name', function(req, res) {

	if (name == 'luis') {
		console.log(name);
	}

	var choice = req.params.teamChoice;
	var name = req.params.name;
	//Check if parameter is of name 'luis'
		var newChoice = new ChoiceModel();
		newChoice.teamChoice = choice;
		newChoice.name = name;
		newChoice.save(function(err, savedObject) {
			if (err) {
				console.log(err);
				res.status(500).send();
			}
			else {
				res.send(savedObject);
			}

		});

		/*
		database.push({choice: choice, name: name});

		var responseObject = { message:  name + ' ' + choice + ' is a cool soccer team!!!'};
		res.send(responseObject);

		else {
		res.status(401).send();
	}
		*/
	//Send message error if name not 'luis'
});

router.get('/teams', function(req, res) {
	//Check if database is empty
	var logValue = req.headers['log'];
	if(logValue && logValue == 'info') {
		console.log("Request received for /teams");
	}

	var select = req.query.select;
	if (database.length == 0) {
		var responseObject = undefined;
		if (select && select == 'count') {
			responseObject = {count: 0};
		}
		res.status(404).send(responseObject);
	}

	else {
		var responseObject = database;
		if (select && select == 'count') {
			responseObject = {count: database.length};
		}
			res.send(responseObject);
	}
})

module.exports = router;
