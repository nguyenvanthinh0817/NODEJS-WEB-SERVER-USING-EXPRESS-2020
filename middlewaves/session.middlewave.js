var shortid = require('shortid');
var Session = require('../models/session.model');


module.exports = async function(req, res, next) {
	if(!req.signedCookies.sessionId){

		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId,{
			signed: true
		});

		await Session.create({
			sessionId: sessionId
		})
	}

	var session = await Session.findOne({sessionId: req.signedCookies.sessionId});
	var carts = session.cart;
	var count = 0;
	for(var key in carts){
		count+= carts[key];
	}

	res.locals.productsCount = count;

	next();
}