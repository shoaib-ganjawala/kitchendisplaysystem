/**
 * Created by shoaib-ganjawala on 30/1/18.
 */

var mongoose = require('mongoose');
var dbConfig = require('../config/databaseConfig');

// configure the database
mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function () {
	console.log('Could not connect to the database. Existing now...');
	process.exit()
});

mongoose.connection.once('open', function() {
	console.log('Successfully connected to the database.');
});