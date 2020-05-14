var User = require('../models/user.model');
module.exports = {
	index: async function(req, res){
	// res.render('users/index',{
	// 	users: db.get('users').value()
	// 	});

		var users = await User.find();
		res.render('users/index', {
			users: users
		})

	},
	search: async (req, res)=>{
		// var q = req.query.q;
		// var matchdUsers = db.get('users').value().filter((user)=>{
		// 	return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		// });
		// res.render('users/index',{
		// 	users:matchdUsers,
		// 	values: req.query
		// });

		var q = req.query.q;
		var matchdUsers = await User.find();
		matchdUsers = matchdUsers.filter((user)=>{
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});
		res.render('users/index',{
			users:matchdUsers,
			values: req.query
		});
	},
	getCreate: async (req, res)=>{
	 res.render('users/create');
	},
	postCreate: async (req, res)=>{
	req.body.avatar = req.file.path.split('\\').splice(1).join('\\');

	await User.create(req.body)


	res.redirect('/users')
	},
	view: async (req, res)=>{
	var id = req.params.id;

	var user = await User.findById(id);


	res.render('users/view',{
		user: user
	});
	},
	remove: async (req, res, next)=>{
		var id = req.params.id;
		await User.findByIdAndDelete(id); 

		 res.redirect('/users');
	},
	getUpdate: async (req, res, next)=>{
		var user = await User.findById(req.params.id)
		res.render('users/update', {
			user: user
		});
	},
	postUpdate: async (req, res, next)=>{

		await User.findByIdAndUpdate(req.params.id, req.body)



		  res.redirect('/users');
	}


}