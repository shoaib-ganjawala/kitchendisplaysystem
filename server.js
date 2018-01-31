var express = require('express');
var bodyParser = require('body-parser');
var orderDone = require('./app/controllers/kitchenController').orderDone;

require('./lib/database');

// create express app
var app = express();

var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
// var io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log("A user is connected");
	socket.on('status added',function(id){
		console.log(id);
		orderDone(id, function(res){
			if(res){
				io.emit('refresh feed', res);
			} else {
				io.emit('error');
			}
		});
	});
});

// parser requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parser resquests of content-type application/json
app.use(bodyParser.json());

//setup oauth2 - currently only password and refreshToken grant type is supported.
require('./lib/oauth').configure(app).registerErrorHandler();

// define a simple route
// app.get('/', function (req, res) {
//   res.json({'message': "Welcome to EasyNote application."})
// });

// Require Notes routes
require('./app/routes/kitchenRoute.js')(app, io);

// listen for resquests
server.listen(3009, function () {
  console.log('server is running on port 3009');
});

//app level error handling
process.on('uncaughtException', function (er) {
	console.error(er.stack);
	process.exit(1)
});

