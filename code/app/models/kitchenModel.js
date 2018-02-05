/**
 * Created by shoaib-ganjawala on 30/1/18.
 */

'use strict';


var mongoose = require('mongoose');
var product = require('./productModel').productSchema;


var kitchenSchema = mongoose.Schema({
	predictionForDate: { type: Date, default: Date.now },
	product: [product],
	order: []
}, {
	timestamps: true
});


module.exports = mongoose.model('kitchen', kitchenSchema);

