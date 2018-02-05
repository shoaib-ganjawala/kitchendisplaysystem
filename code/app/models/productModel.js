/**
 * Created by shoaib-ganjawala on 30/1/18.
 */

'use strict';

var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	productName: String,
	predictedQuantity: { type: Number, default : 0 },
	producedQuantity: { type: Number, default : 0 }
}, {
	timestamps: true
});

module.exports = {
	product: mongoose.model('Product', productSchema),
	productSchema: productSchema
};
