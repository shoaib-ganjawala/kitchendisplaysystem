/**
 * Created by shoaib-ganjawala on 17/1/18.
 */

var mongoose = require('mongoose');
var dbConfig = require('../code/config/databaseConfig');

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