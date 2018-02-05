/**
 * Created by shoaib-ganjawala on 30/1/18.
 */

'use strict';


var mongoose = require('mongoose');
var product = require('./productModel').productSchema;


var orderSchema = mongoose.Schema({
	product: product,
	quantity: Number,
	status: {type: Number, default: 0}
}, {
	timestamps: true
});


module.exports = mongoose.model('order', orderSchema);

