var Product = require('../models/product.model');

module.exports.index = async function(req, res, next){
	var x = 8;
	if(!req.query.page){
		req.query.page = 1;
	}
	var start =  (req.query.page - 1)*x;
	var end = (req.query.page - 1)*x + x;
	var products = await Product.find();

	products = products.slice(start, end);
	res.render('products/index', {
		products: products
	})
}