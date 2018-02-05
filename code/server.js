require('./lib/database');
var express = require('express');
var bodyParser = require('body-parser');
var orderDone = require('./app/controllers/kitchenController').orderDone;
var port = process.env.PORT || 3009;

// create express app
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
	socket.on('OrderDone', function (id) {
		orderDone(id, function (res) {
			if (res) {
				io.emit('refresh feed', res);
			} else {
				io.emit('error');
			}
		});
	});
});

// parser requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parser resquests of content-type application/json
app.use(bodyParser.json());

// Require Notes routes
require('./app/routes/kitchenRoute')(app, io);

// listen for resquests
server.listen(port, function () {
	console.log('server is running on port ' + port);
});

//app level error handling
process.on('uncaughtException', function () {
	process.exit(1)
});