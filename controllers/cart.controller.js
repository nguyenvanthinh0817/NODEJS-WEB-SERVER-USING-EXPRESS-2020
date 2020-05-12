var db = require('../db');
module.exports.addToCart = function(req, res, next){
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	var count = db.get('sessions')
		.find({id: sessionId})
		.get('cart.' + productId, 0)
		.value();

	db.get('sessions')
		.find({id: sessionId})
		.set('cart.' + productId, count + 1)
		.write();
	res.redirect('/products');
};

module.exports.index = function(req, res, next){
	var carts = db.get('sessions')
		.find({id: req.signedCookies.sessionId})
		.value()
		.cart
	var products = [];
	for(var key in carts){
		
		var item = db.get('products').find({id: key}).value();
		item.quantity = carts[key];
		item.price = carts[key]*item.price
		products.push(item);

	}
	res.render('carts/index',{
		products: products
	});
}