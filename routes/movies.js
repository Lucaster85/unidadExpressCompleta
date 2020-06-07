var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.list);

router.get('/drama', moviesController.drama);

router.get('/top', moviesController.top);

router.get('/:id', moviesController.detail);

module.exports = router;