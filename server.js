var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.js');
var mongoose = require('mongoose');

var app = express();

mongoose.connect(config.database, function(err){
	if(err){
       console.log(err);
	}
	else{
       console.log('Connected to the database');
	}
});

app.use(bodyParser.urlencoded({ extended: true }));  // true >> parse any url including (images, videos .. etc)
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static( __dirname + "/public"));

/**
*  using mongoDB
*/
var api = require('./app/routes/api.js')(app, express);
app.use('/school', api);                         

app.get('*', function(req, res){  		// any route go to index
	res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port, function(err){
	if(err){
      console.log(err);
	}
	else{
      console.log("listening on port 3000");
	}
});