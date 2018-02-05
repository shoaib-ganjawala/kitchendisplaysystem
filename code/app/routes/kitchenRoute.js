/**
 * Created by shoaib-ganjawala on 30/1/18.
 */

module.exports = function (app, io) {
	
	var kitchen = require('../controllers/kitchenController');
	
	app.get("/", function (req, res) {
		res.sendFile(__dirname + '/kitchen.html');
	});
	
	app.post('/product/create', kitchen.createProduct);
	
	app.get('/getProduct', kitchen.getProduct);
	
	app.post('/doPrediction', kitchen.doPrediction);
	
	app.post('/placeorder', function (req, res) {
		kitchen.placeOrder(req, res, io);
	});
	
	app.get('/getKitchenData', kitchen.getKitchenData)
	
};
