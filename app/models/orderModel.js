/**
 * Created by shoaib-ganjawala on 27/1/18.
 */

'use strict';


const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const product = require('./productModel').productSchema;


var orderSchema = mongoose.Schema({
	product: product,
	quantity: Number,
	status: {type: Number, default: 0}
}, {
	timestamps: true
});


module.exports = mongoose.model('order', orderSchema);

