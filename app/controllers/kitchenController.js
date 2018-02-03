/**
 * Created by shoaib-ganjawala on 27/1/18.
 */


'use strict';


var kitchen = require('../models/kitchenModel');
var product = require('../models/productModel').product;
var order = require('../models/orderModel');
const mongoose = require('mongoose');
var _ = require('lodash');


exports.createProduct = function (req, res) {
	if (!req.body) {
		res.status(400).send({message: "Data can not be empty."});
	}
	
	var productSchema = new product({
		productName: req.body.productName,
		predictedQuantity: req.body.predictedQuantity
	});
	
	productSchema.save(function (err, data) {
		if (err) {
			res.status(500).send({message: "Some error occured while creating." + err})
		} else {
			res.send({success: true, data: [data]});
		}
	})
};


exports.doPrediction = function (req, res) {
	if (!req.body) {
		res.status(400).send({message: "kitchen can not be empty."});
	}
	
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	var end = new Date();
	end.setHours(23, 59, 59, 999);
	
	var predictionSchema = new kitchen({
		product: req.body.product,
		predictionForDate: req.body.predictionForDate
	});
	
	kitchen.find({"predictionForDate": {$gte: start, $lt: end}}, function (e, kitchenData) {
		if (e) {
			return;
		}
		if (!!kitchenData[0]) {
			kitchenData[0].product = req.body.product;
			var rowOrder = kitchenData[0].order;
			kitchenData[0].order = [];
			
			_.forEach(rowOrder, function (data) {
				var orderSchema = new order({
					product: {
						_id: data.product._id,
						productName: data.product.productName,
						producedQuantity: data.product.producedQuantity,
						predictedQuantity: _.find(req.body.product, function (obj) {
							return obj._id == data.product._id;
						}).predictedQuantity
					},
					quantity: data.quantity,
					status: data.status
				});
				kitchenData[0].order.push(orderSchema);
			});
			
			kitchenData[0].save(function (err, data) {
				if (err) {
					res.status(500).send({message: "Some error occured while creating."})
				} else {
					res.send(data);
				}
			})
		} else {
			predictionSchema.save(function (err, data) {
				if (err) {
					res.status(500).send({message: "Some error occured while creating."})
				} else {
					res.send({success: true, data: [data]});
				}
			})
		}
	});
};


exports.getProduct = function (req, res) {
	product.find({}, function (e, kitchenData) {
		if (e) {
			return;
		}
		if (!!kitchenData) {
			res.status(200).send(kitchenData);
		}
	})
};


exports.placeOrder = function (req, res, io) {
	if (!req.body) {
		res.status(400).send({message: "Model can not be empty."});
	}
	
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	var end = new Date();
	end.setHours(23, 59, 59, 999);
	
	kitchen.find({"predictionForDate": {$gte: start, $lt: end}}, function (e, kitchenData) {
		if (e) {
			return;
		}
		if (!!kitchenData[0]) {
			var orderSchema = new order({
				product: {
					_id: req.body._id,
					productName: req.body.productName,
					predictedQuantity: _.find(kitchenData[0].product, function (obj) {
						return obj._id == req.body._id;
					}).predictedQuantity
				},
				quantity: req.body.quantity,
				status: 0
			});
			
			kitchenData[0].order.push(orderSchema);
			kitchenData[0].save(function (err, data) {
				if (err) {
					res.status(500).send({message: "Some error occured while creating."})
				} else {
					io.emit('refresh feed', data);
					res.send({success: true, data: [data]});
				}
			})
		} else {
			res.send({success: false, message: "First do the prediction for the day"});
		}
	})
};


exports.getKitchenData = function (req, res) {
	if (!req.body) {
		res.status(400).send({message: "Model can not be empty."});
	}
	
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	var end = new Date();
	end.setHours(23, 59, 59, 999);
	
	kitchen.find({"predictionForDate": {$gte: start, $lt: end}}, function (e, kitchenData) {
		if (e) {
			return;
		}
		res.send({success: true, data: kitchenData});
	})
};


exports.orderDone = function (id, cb) {
	
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	var end = new Date();
	end.setHours(23, 59, 59, 999);
	
	kitchen.find({"predictionForDate": {$gte: start, $lt: end}}, function (e, kitchenData) {
		if (e) {
			return;
		}
		if (!!kitchenData[0]) {
			
			var withOutArray = _.filter(kitchenData[0].order, function (o) {
				return o._id != id;
			});
			
			var withObj = _.filter(kitchenData[0].order, function (o) {
				return o._id == id;
			})[0];
			
			kitchenData[0].order = withOutArray;
			var orderSchema = new order({
				product: {
					_id: withObj.product._id,
					productName: withObj.product.productName,
					predictedQuantity: withObj.product.predictedQuantity
				},
				quantity: withObj.quantity,
				status: 1
			});
			
			kitchenData[0].order.push(orderSchema);
			kitchenData[0].save(function (err, data) {
				if (err) {
					cb(null);
				} else {
					cb(data);
				}
			})
		}
	})
};

