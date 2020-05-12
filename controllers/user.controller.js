var shortid = require('shortid');
var db = require('../db');

module.exports = {
	index: function(req, res){
	res.render('users/index',{
		users: db.get('users').value()
		});
	},
	search: (req, res)=>{
	var q = req.query.q;
	var matchdUsers = db.get('users').value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index',{
		users:matchdUsers,
		values: req.query
	});
	},
	getCreate: (req, res)=>{
		console.log(req.cookies)
	res.render('users/create');
	},
	postCreate: (req, res)=>{
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').splice(1).join('\\');
	db.get('users').push(req.body).write();
	res.redirect('/users')
	},
	view: (req, res)=>{
	var id = req.params.id;

	var user = db.get('users').find({id: id}).value();
	res.render('users/view',{
		user: user
	});
	},
	remove: (req, res, next)=>{
		var id = req.params.id;
		db.get('users')
		  .remove({ id: id })
		  .write();

		 res.redirect('/users');
	},
	getUpdate: (req, res, next)=>{
		var user = db.get('users')
						.find({id: req.params.id})
						.value();
		res.render('users/update', {
			user: user
		});
	},
	postUpdate: (req, res, next)=>{
		var id = req.params.id;
		var name = req.body.name;
		db.get('users')
		  .find({id: id })
		  .assign({ name: req.body.name})
		  .assign({ phone: req.body.phone})
		  .write()

		  res.redirect('/users');
	}


}