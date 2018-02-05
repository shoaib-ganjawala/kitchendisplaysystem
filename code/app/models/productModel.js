/**
 * Created by shoaib-ganjawala on 27/1/18.
 */

'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

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
