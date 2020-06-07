var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.list);

router.get('/:id', moviesController.detail);

module.exports = router;