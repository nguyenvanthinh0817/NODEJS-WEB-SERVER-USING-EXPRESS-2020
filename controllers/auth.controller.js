var User = require('../models/user.model');


module.exports.login = function(req, res, next){
	 res.render('auth/login')
}

module.exports.postLogin = async function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var user = await User.findOne({email: email});
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

	res.cookie('userId', user.id,{
		signed: true
	});
	res.redirect('/users');

};