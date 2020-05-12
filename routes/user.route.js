var express = require('express');
var multer = require('multer');
var router = express.Router();
var shortid = require('shortid');
var db = require('../db');
var controller = require('../controllers/user.controller');

var validate = require('../validate/user.validate');

var upload = multer({dest: './public/uploads'})

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.getCreate);

router.post('/create',
	upload.single('avatar'),
	validate.postCreate,
	controller.postCreate
	);

router.post('/update/:id',upload.single('avatar'), controller.postUpdate);

router.get('/:id', controller.view);

router.get('/remove/:id', controller.remove);
router.get('/update/:id', controller.getUpdate);

module.exports = router;