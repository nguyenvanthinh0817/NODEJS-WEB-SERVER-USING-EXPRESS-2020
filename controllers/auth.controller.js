var shortid = require('shortid');
var db = require('../db');


module.exports.login = function(req, res, next){
	 res.render('auth/login')
}

module.exports.postLogin = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var user = db.get('users').find({email: email}).value();
	console.log(user);
	console.log(password);
	if(!user){
		res.render('auth/login', {
			errors: [
				'User does not exists'
			],
			values: req.body
		})
		return;
	}

	if(user.password !== password){
		res.render('auth/login', {
			errors: [
				'Wrong password'
				],
			values: req.body
		});
		return;
	}

	res.cookie('userId', user.id);
	res.redirect('/users');

};