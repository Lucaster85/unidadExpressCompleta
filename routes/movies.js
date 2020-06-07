var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.list)

module.exports = router;