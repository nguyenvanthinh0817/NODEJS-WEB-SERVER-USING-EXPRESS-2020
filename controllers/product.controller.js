var db = require('../db');

module.exports.index = function(req, res, next){
	var x = 8;
	if(!req.query.page){
		req.query.page = 1;
	}
	var start =  (req.query.page - 1)*x;
	var end = (req.query.page - 1)*x + x;
	var products = db.get('products').value().slice(start, end);
	res.render('products/index', {
		products: products
	})
}