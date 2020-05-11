var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controller = require('../controllers/auth.controller');


router.get('/login', controller.login);

router.post('/postLogin', controller.postLogin);



module.exports = router;