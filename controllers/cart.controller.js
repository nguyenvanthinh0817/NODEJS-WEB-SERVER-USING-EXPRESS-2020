
var Product = require('../models/product.model');
var Sessions = require('../models/session.model');
module.exports.addToCart = async function(req, res, next){
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	var session = await Sessions.findOne({sessionId: sessionId});
	var count = session.cart[req.params.productId]

	if(!count){
		count = 0;
	}

	session.cart[productId] = count + 1;

	await Sessions.findByIdAndUpdate(session.id, session);
	res.redirect('/products');
};

module.exports.index = async function(req, res, next){
	var session = await Sessions.findOne({sessionId: req.signedCookies.sessionId});
	var carts = session.cart;
	var products = [];
	for(var key in carts){
		
		var item = await Product.findById(key);
		item.quantity = carts[key];
		item.price = carts[key]*item.price
		products.push(item);

	}
	res.render('carts/index',{
		products: products
	});
}