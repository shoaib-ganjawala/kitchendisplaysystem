/**
 * Created by shoaib-ganjawala on 27/1/18.
 */

'use strict';


const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const product = require('./productModel').productSchema;


var kitchenSchema = mongoose.Schema({
	predictionForDate: { type: Date, default: Date.now },
	product: [product],
	order: []
}, {
	timestamps: true
});


module.exports = mongoose.model('kitchen', kitchenSchema);

