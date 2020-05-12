var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId,{
			signed: true
		});
		db.get('sessions').push({
			id: sessionId
		}).write();		
	}

	var carts = db.get('sessions')
			.find({id: req.signedCookies.sessionId})
			.value()
			.cart
	var count = 0;
	for(var key in carts){
		count+= carts[key];
	}

	res.locals.productsCount = count;

	next();
}